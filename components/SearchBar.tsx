import React from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

export function SearchBar() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <View style={[styles.searchBox, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F2' }]}>
        <IconSymbol name="magnifyingglass" size={20} color="#8E8E93" />
        <TextInput 
          placeholder="Search..." 
          placeholderTextColor="#8E8E93"
          style={[styles.input, { color: isDark ? '#FFF' : '#000' }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 36,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  }
});
