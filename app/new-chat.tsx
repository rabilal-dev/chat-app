import AuthBackground from '@/components/AuthBackground';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { findUser } from '@/libs/find-user';
import { createChat } from '@/services/chatsServices';
import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactsAlreadyOnWave, setContactsAlreadyOnWave] = useState<any[]>([]);
  const [existingContactsIds, setExistingContactsIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') return;

        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        const { updatedUsers, existingContactsIds } = await findUser(data);
        setContacts(data);
        setContactsAlreadyOnWave(updatedUsers);
        setExistingContactsIds(existingContactsIds);
      } catch (error) {
        console.error('Error loading contacts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadContacts();
  }, []);

  const sections = useMemo(() => {
    const query = searchQuery.toLowerCase();

    const wave = contactsAlreadyOnWave.filter(u =>
      u.deviceContact?.name?.toLowerCase().includes(query) ||
      u.name?.toLowerCase().includes(query)
    );

    const invite = contacts.filter(c =>
      c.name.toLowerCase().includes(query) &&
      //@ts-ignore
      !existingContactsIds.includes(c.id)
    );

    return [
      wave.length > 0 && { title: 'On Wave', data: wave, type: 'wave' },
      invite.length > 0 && { title: 'Invite to Wave', data: invite, type: 'invite' }
    ].filter(Boolean) as any[];
  }, [searchQuery, contacts, contactsAlreadyOnWave, existingContactsIds]);
  const addChat = async (userId: string) => {
    try {
      const response = await createChat(userId);
      const { chat } = response;
      console.log("Created chat:", chat);
      // Optionally navigate to the new chat screen here
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  }

  const handlePress = useCallback((item: any, type: string) => {
    if (type === 'wave') {
      console.log("WAVE CHAT:", item?._id)
      addChat(item?._id);
    } else {
      console.log('Inviting:', item.name);
    }
  }, [router]);

  const renderItem = useCallback(({ item, section }: { item: any, section: any }) => {
    const isWave = section.type === 'wave';
    const name = isWave ? (item?.deviceContact?.name || item?.name) : item?.name;
    const imageUri = isWave ? item?.deviceContact?.image?.uri : item?.image?.uri;
    const hasImage = isWave ? item?.deviceContact?.imageAvailable : item?.imageAvailable;
    // Extract a string representation for the status
    const sub = isWave
      ? (typeof item?.status === 'string' ? item.status : 'Online')
      : (item.phoneNumbers?.[0]?.number || 'No number');

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}
        onPress={() => handlePress(item, section.type)}
        activeOpacity={0.7}
      >
        <View style={styles.avatar}>
          {hasImage ? (
            <Image source={{ uri: imageUri }} style={StyleSheet.absoluteFill} borderRadius={24} />
          ) : (
            <Text style={styles.initials}>{name?.charAt(0).toUpperCase()}</Text>
          )}
          {isWave && item?.status === 'online' && <View style={styles.badge} />}
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: isDark ? '#FFF' : '#000' }]}>{name}</Text>
          <Text style={styles.sub} numberOfLines={1}>{sub}</Text>
        </View>
        {isWave ? (
          <IconSymbol name="chevron.right" size={20} color={isDark ? '#555' : '#CCC'} />
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => handlePress(item, 'invite')}>
            <Text style={styles.btnText}>Invite</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }, [isDark, handlePress]);

  return (
    <AuthBackground>
      <StatusBar style="auto" />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={router.back} style={styles.navBtn}>
          <IconSymbol name="chevron.left" size={24} color="#7C3AED" />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#FFF' : '#000' }]}>New Chat</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.search}>
        <View style={[styles.inputWrapper, { backgroundColor: isDark ? '#1C1C1E' : '#FFF' }]}>
          <IconSymbol name="magnifyingglass" size={20} color="#7C3AED" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search contacts..."
            placeholderTextColor={isDark ? '#666' : '#999'}
            style={[styles.input, { color: isDark ? '#FFF' : '#000' }]}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#7C3AED" />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, i) => (item.id || item.deviceContact?.id || i).toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.headerText}>{title}</Text>}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 20 }}
          style={{ flex: 1 }}
          stickySectionHeadersEnabled={false}
        />
      )}
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  navBtn: { width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  search: { padding: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(124,58,237,0.1)' },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  headerText: { fontSize: 13, fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase', marginVertical: 10 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 16, marginBottom: 8 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#7C3AED', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  initials: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  badge: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  sub: { fontSize: 13, color: '#999' },
  btn: { backgroundColor: 'rgba(124,58,237,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: '#7C3AED', fontSize: 14, fontWeight: '600' },
});
