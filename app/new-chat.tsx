import AuthBackground from '@/components/AuthBackground';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status?: string;
}

const MOCK_CONTACTS: Contact[] = [];

export default function NewChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = MOCK_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactPress = (contact: Contact) => {
    router.push(`/chat/${contact.id}`);
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={[styles.contactItem, { backgroundColor: isDark ? 'rgba(31, 44, 52, 0.4)' : 'rgba(255, 255, 255, 0.4)' }]}
      onPress={() => handleContactPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.status === 'online' && <View style={styles.onlineBadge} />}
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: isDark ? '#FFF' : '#000' }]}>
          {item.name}
        </Text>
        {item.status && (
          <Text style={[styles.contactStatus, { color: isDark ? '#A1A1AA' : '#666' }]}>
            {item.status}
          </Text>
        )}
      </View>
      <IconSymbol name="chevron.right" size={20} color={isDark ? '#444' : '#CCC'} />
    </TouchableOpacity>
  );

  return (
    <AuthBackground>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={28} color="#7C3AED" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000' }]}>New Chat</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputWrapper, { backgroundColor: isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)' }]}>
          <IconSymbol name="magnifyingglass" size={20} color="#7C3AED" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search contacts..."
            placeholderTextColor={isDark ? '#666' : '#999'}
            style={[styles.searchInput, { color: isDark ? '#FFF' : '#000' }]}
          />
        </View>
      </View>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        ListHeaderComponent={<Text style={styles.listHeader}>Contacts on Wave</Text>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="person.fill" size={60} color={isDark ? '#333' : '#DDD'} />
            <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>
              No contacts found
            </Text>
          </View>
        }
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      />
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  listHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#7C3AED',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.05)',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7C3AED',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#A78BFA',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  contactStatus: {
    fontSize: 13,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
