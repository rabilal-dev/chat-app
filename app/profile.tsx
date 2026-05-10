import AuthBackground from '@/components/AuthBackground';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuthStore } from '@/store/authStore';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { user, logout, updateUser } = useAuthStore();

  const [name, setName] = useState(user?.name || 'User');
  const [about, setAbout] = useState('Hey there! I am using Wave.');

  // Sync with store if user changes
  useEffect(() => {
    if (user?.name) setName(user.name);
    if (user?.about) setAbout(user.about);

  }, [user?.name, user?.about, user?.avatar_url]);

  // Editing state
  const [editingField, setEditingField] = useState<'name' | 'about' | null>(null);
  const [tempValue, setTempValue] = useState('');

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#A1A1AA' : '#666';
  const cardColor = isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const dividerColor = isDark ? 'rgba(55, 64, 69, 0.4)' : 'rgba(233, 237, 239, 0.8)';

  const handleStartEdit = (field: 'name' | 'about', currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = () => {
    if (editingField === 'name') {
      setName(tempValue);
      updateUser({ name: tempValue });
    }
    if (editingField === 'about') {
      setAbout(tempValue);
      updateUser({ about: tempValue });
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const ProfileRow = ({ 
    icon, 
    title, 
    value, 
    note, 
    field,
    maxLength,
    editable = true 
  }: { 
    icon: any, 
    title: string, 
    value: string, 
    note?: string, 
    field?: 'name' | 'about',
    maxLength?: number,
    editable?: boolean 
  }) => {
    const isEditing = editingField === field;

    return (
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <IconSymbol name={icon} size={24} color="#7C3AED" />
        </View>
        <View style={[styles.contentContainer, { borderBottomColor: dividerColor }]}>
          <View style={styles.textWrapper}>
            <Text style={[styles.label, { color: '#7C3AED', fontWeight: 'bold' }]}>{title}</Text>
            
            {isEditing ? (
              <View style={styles.editWrapper}>
                <TextInput
                  autoFocus
                  style={[styles.input, { color: textColor, borderBottomColor: '#7C3AED' }]}
                  value={tempValue}
                  onChangeText={setTempValue}
                  maxLength={maxLength}
                />
                <View style={styles.editActions}>
                  <Text style={[styles.maxLengthText, { color: subTextColor }]}>
                    {maxLength ? maxLength - tempValue.length : ''}
                  </Text>
                  <Pressable onPress={handleCancel} style={styles.actionIcon}>
                    <IconSymbol name="xmark" size={20} color={subTextColor} />
                  </Pressable>
                  <Pressable onPress={handleSave} style={styles.actionIcon}>
                    <IconSymbol name="checkmark" size={20} color="#7C3AED" />
                  </Pressable>
                </View>
              </View>
            ) : (
              <>
                <Text style={[styles.value, { color: textColor }]}>{value}</Text>
                {note && <Text style={[styles.note, { color: subTextColor }]}>{note}</Text>}
              </>
            )}
          </View>
          
          {editable && !isEditing && (
            <Pressable 
              style={styles.editBtn} 
              onPress={() => field && handleStartEdit(field, value)}
            >
              <IconSymbol name="pencil" size={20} color="#7C3AED" />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <AuthBackground>

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={user?.avatar_url || "https://i.pravatar.cc/150?u=me"} 
              style={styles.avatar}
              contentFit="cover"
            />
            <Pressable style={styles.cameraBtn}>
              <IconSymbol name="camera" size={24} color="#FFF" />
            </Pressable>
          </View>
        </View>

        {/* Info Sections */}
        <View style={[styles.infoCard, { backgroundColor: cardColor }]}>
          <ProfileRow 
            icon="person.fill" 
            title="Name" 
            value={name} 
            field="name"
            maxLength={25}
            note="This is not your username or pin. This name will be visible to your Wave contacts."
          />
          <ProfileRow 
            icon="info.circle" 
            title="About" 
            value={about} 
            field="about"
            maxLength={139}
          />
          <ProfileRow 
            icon="phone.fill" 
            title="Mobile Number" 
            value={user?.phone || 'Not available'} 
            editable={false}
          />
        </View>

        {/* Logout Section */}
        <View style={[styles.infoCard, { backgroundColor: cardColor, marginTop: 24, marginBottom: 40 }]}>
          <Pressable 
            style={styles.row}
            onPress={logout}
          >
            <View style={styles.iconContainer}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#FF3B30" />
            </View>
            <View style={[styles.contentContainer, { borderBottomWidth: 0 }]}>
              <View style={styles.textWrapper}>
                <Text style={[styles.value, { color: '#FF3B30', fontSize: 17, fontWeight: 'bold' }]}>Logout</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
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
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarWrapper: {
    width: 160,
    height: 160,
    position: 'relative',
    elevation: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    backgroundColor: '#7C3AED',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#7C3AED',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  infoCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.1)',
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  iconContainer: {
    width: 36,
    paddingTop: 24,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 17,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    marginTop: 8,
    lineHeight: 18,
  },
  editBtn: {
    paddingLeft: 12,
    justifyContent: 'center',
  },
  editWrapper: {
    marginTop: 4,
  },
  input: {
    fontSize: 17,
    borderBottomWidth: 2,
    paddingVertical: 4,
    paddingRight: 80, 
  },
  editActions: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  maxLengthText: {
    fontSize: 12,
    marginRight: 12,
  },
  actionIcon: {
    padding: 8,
  },
});
