import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_STATUSES, StatusItemT } from '@/constants/MockData';
import { useAuthStore } from '@/store/authStore';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthBackground from '@/components/AuthBackground';

export default function UpdatesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const router = useRouter();

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#A1A1AA' : '#666';
  const itemBg = isDark ? 'rgba(31, 44, 52, 0.4)' : 'rgba(255, 255, 255, 0.4)';

  const StatusRow = ({ item, isMe = false }: { item?: StatusItemT; isMe?: boolean }) => {
    const avatar = isMe ? (user?.avatar || 'https://i.pravatar.cc/150?u=me') : item?.avatar;
    const name = isMe ? 'My status' : item?.name;
    const time = isMe ? 'Tap to add status update' : item?.time;
    const hasUnseen = item?.hasUnseen || false;

    const handlePress = () => {
      if (!isMe && item) {
        router.push(`/status/${item.id}` as any);
      }
    };

    return (
      <Pressable 
        style={({ pressed }) => [
          styles.row, 
          { backgroundColor: pressed ? (isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)') : itemBg }
        ]} 
        onPress={handlePress}
      >
        <View style={styles.avatarContainer}>
          <View style={[
            styles.ring,
            { borderColor: isMe ? 'transparent' : (hasUnseen ? '#7C3AED' : '#888') }
          ]}>
            <Image
              source={avatar}
              style={styles.avatar}
              contentFit="cover"
            />
          </View>
          {isMe && (
            <View style={styles.plusBadge}>
              <IconSymbol name="plus.circle.fill" size={20} color="#7C3AED" />
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textWrapper}>
            <Text style={[styles.name, { color: textColor }]}>{name}</Text>
            <Text style={[styles.time, { color: subTextColor }]}>{time}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const unseenStatuses = MOCK_STATUSES.filter(s => s.hasUnseen);
  const seenStatuses = MOCK_STATUSES.filter(s => !s.hasUnseen);

  return (
    <AuthBackground>
      <FlatList
        data={[]} 
        renderItem={null}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <StatusRow isMe />

            {unseenStatuses.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionHeaderText, { color: '#7C3AED' }]}>Recent updates</Text>
                </View>
                {unseenStatuses.map(item => (
                  <StatusRow key={item.id} item={item} />
                ))}
              </>
            )}

            {seenStatuses.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={[styles.sectionHeaderText, { color: '#7C3AED' }]}>Viewed updates</Text>
                </View>
                {seenStatuses.map(item => (
                  <StatusRow key={item.id} item={item} />
                ))}
              </>
            )}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Buttons */}
      <View style={styles.fabContainer}>
        <Pressable style={[styles.fabSmall, { backgroundColor: isDark ? 'rgba(31, 44, 52, 0.9)' : 'rgba(255, 255, 255, 0.9)' }]}>
          <IconSymbol name="pencil" size={20} color={isDark ? '#FFF' : '#5E5E5E'} />
        </Pressable>
        <Pressable style={styles.fabLarge}>
          <IconSymbol name="camera.fill" size={24} color="#FFF" />
        </Pressable>
      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.05)',
  },
  avatarContainer: {
    position: 'relative',
    paddingVertical: 10,
  },
  ring: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#7C3AED',
  },
  plusBadge: {
    position: 'absolute',
    bottom: 8,
    right: -2,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    paddingVertical: 16,
  },
  textWrapper: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
  },
  sectionHeader: {
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 90, // Increased from 24 to clear the absolute tab bar
    right: 24,
    alignItems: 'center',
    gap: 16,
  },
  fabSmall: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  fabLarge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
