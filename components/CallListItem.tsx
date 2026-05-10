import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

export interface CallItemT {
  id: string;
  name: string;
  time: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  isVideo: boolean;
}

interface CallListItemProps {
  call: CallItemT;
  onPress: () => void;
  onIconPress?: () => void;
}

export function CallListItem({ call, onPress, onIconPress }: CallListItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const textColor = isDark ? '#FFF' : '#000';
  const subTextColor = isDark ? '#A1A1AA' : '#666';
  const itemBg = isDark ? 'rgba(31, 44, 52, 0.4)' : 'rgba(255, 255, 255, 0.4)';

  const getCallTypeIcon = () => {
    switch (call.type) {
      case 'missed':
        return <IconSymbol name="arrow.down.left" size={14} color="#FF3B30" />;
      case 'incoming':
        return <IconSymbol name="arrow.down.left" size={14} color="#7C3AED" />;
      case 'outgoing':
        return <IconSymbol name="arrow.up.right" size={14} color="#7C3AED" />;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { 
          backgroundColor: pressed ? (isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)') : itemBg,
          borderColor: 'rgba(124, 58, 237, 0.05)'
        }
      ]}
    >
      <Image
        source={call.avatar}
        style={styles.avatar}
        contentFit="cover"
        transition={200}
      />

      <View style={styles.contentContainer}>
        <View style={styles.leftCol}>
          <Text style={[styles.name, { color: call.type === 'missed' ? '#FF3B30' : textColor }]} numberOfLines={1}>
            {call.name}
          </Text>
          <View style={styles.subtextContainer}>
            {getCallTypeIcon()}
            <Text style={[styles.time, { color: subTextColor }]} numberOfLines={1}>
              {call.time}
            </Text>
          </View>
        </View>

        <Pressable onPress={onIconPress} style={styles.rightCol} hitSlop={10}>
          <IconSymbol name={call.isVideo ? "video.fill" : "phone.fill"} size={22} color="#7C3AED" />
        </Pressable>
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
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 16,
    backgroundColor: '#7C3AED',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftCol: {
    flex: 1,
    justifyContent: 'center',
  },
  subtextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  time: {
    fontSize: 14,
  },
  rightCol: {
    padding: 8,
  }
});
