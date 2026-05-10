import React, { ComponentProps } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName?: ComponentProps<typeof IconSymbol>['name'];
}

export function FloatingActionButton({ onPress, iconName = 'plus' }: FloatingActionButtonProps) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        { opacity: pressed ? 0.8 : 1 }
      ]}
    >
      <IconSymbol name={iconName} size={24} color="#FFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90, // Increased from 24 to clear the absolute tab bar (60px)
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 20, // Modern squircle-like shape
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999,
  },
});
