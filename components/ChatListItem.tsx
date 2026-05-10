import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { IconSymbol } from './ui/icon-symbol';

export interface ChatItemT {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount?: number;
}

interface ChatListItemProps {
  chat: ChatItemT;
  onPress: () => void;
}

export function ChatListItem({ chat, onPress }: ChatListItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#A1A1AA' : '#666';
  const itemBg = isDark ? 'rgba(31, 44, 52, 0.4)' : 'rgba(255, 255, 255, 0.4)';

  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: pressed ? (isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)') : itemBg,
          borderColor: isDark ? 'rgba(124, 58, 237, 0.05)' : 'rgba(124, 58, 237, 0.05)'
        }
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={chat.avatar}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.statusIndicator} />
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={[styles.time, { color: chat.unreadCount ? '#7C3AED' : subTextColor }]}>
            {chat.time}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.message, { color: subTextColor }]} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          ) : (
             <IconSymbol name="checkmark.all" size={16} color="#7C3AED" style={{ opacity: 0.6 }} />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
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
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A78BFA',
    borderWidth: 2,
    borderColor: '#FFF',
    opacity: 0, // Hidden by default, can be toggled if we had online status
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
