import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList, useColorScheme, TextInput, Pressable, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { ChatListItem, ChatItemT } from '@/components/ChatListItem';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AuthBackground from '@/components/AuthBackground';

const MOCK_GROUPS: ChatItemT[] = [
  {
    id: 'g1',
    name: 'Family WhatsApp',
    lastMessage: 'Aunt May: Look at this cute dog!',
    time: '12:05',
    avatar: 'https://i.pravatar.cc/150?u=g1',
    unreadCount: 5,
  },
  {
    id: 'g2',
    name: 'Project Alpha Team',
    lastMessage: 'Sarah: PR is merged via staging.',
    time: '09:30',
    avatar: 'https://i.pravatar.cc/150?u=g2',
  },
  {
    id: 'g3',
    name: 'Weekend Trip',
    lastMessage: 'You: Sounds great, see you there!',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?u=g3',
  },
  {
    id: 'g4',
    name: 'College Alumni',
    lastMessage: 'Dan: Anyone coming to the reunion?',
    time: 'Yesterday',
    avatar: 'https://i.pravatar.cc/150?u=g4',
    unreadCount: 12,
  },
  {
    id: 'g5',
    name: 'Housing Committee',
    lastMessage: 'Admin: Please check the new guidelines.',
    time: 'Monday',
    avatar: 'https://i.pravatar.cc/150?u=g5',
  },
];

export default function GroupsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: isDark ? "#1F2C33" : "#7C3AED",
      },
      headerTintColor: "#FFF",
      headerTitle: isSearching ? () => (
        <TextInput
          autoFocus
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search groups..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={{ color: '#FFF', fontSize: 18, minWidth: 200 }}
          selectionColor="#FFF"
        />
      ) : 'Groups',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, gap: 16 }}>
          {!isSearching && (
            <IconSymbol name="camera" size={24} color="#FFF" />
          )}
          <Pressable 
            onPress={() => {
              if (isSearching) {
                setIsSearching(false);
                setSearchQuery('');
              } else {
                setIsSearching(true);
              }
            }}
            hitSlop={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol name={isSearching ? 'xmark' : 'magnifyingglass'} size={24} color="#FFF" />
          </Pressable>
          {!isSearching && (
            <Pressable
              onPress={() => router.push("/profile")}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <IconSymbol name="ellipsis" size={24} color="#FFF" />
            </Pressable>
          )}
        </View>
      )
    });
  }, [navigation, isSearching, searchQuery, isDark, router]);

  const filteredGroups = MOCK_GROUPS.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    group.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthBackground>
      <StatusBar style="light" />
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem 
            chat={item} 
            onPress={() => router.push(`/chat/${item.id}`)} 
          />
        )}
        ListHeaderComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="person.3.fill" size={60} color={isDark ? "#333" : "#DDD"} />
            <Text style={{ color: isDark ? "#888" : "#999", marginTop: 12, fontSize: 16 }}>
              No groups found
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton onPress={() => console.log('New group')} />
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 100,
  }
});
