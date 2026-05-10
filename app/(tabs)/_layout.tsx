import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: isDark ? '#8696A0' : '#667781',
        tabBarStyle: {
          backgroundColor: isDark ? 'rgba(31, 44, 52, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          position: 'absolute',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1F2C33' : '#7C3AED',
        },
        headerTintColor: '#fff',
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style={[
            StyleSheet.absoluteFill, 
            { backgroundColor: isDark ? 'rgba(31, 44, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)' }
          ]} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Wave',
          tabBarLabel: 'Chats',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bubble.right.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: true,
          title: 'Groups',
          tabBarLabel: 'Groups',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.3.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: true,
          title: 'Updates',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle.dashed" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          headerShown: true,
          title: 'Calls',
          tabBarLabel: 'Calls',
          // @ts-ignore
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="phone.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
