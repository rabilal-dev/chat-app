import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, FlatList, useColorScheme, TextInput, Pressable, Text } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { CallListItem, CallItemT } from '@/components/CallListItem';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AuthBackground from '@/components/AuthBackground';

const MOCK_CALLS: CallItemT[] = [
  {
    id: 'c1',
    name: 'Alice Smith',
    time: 'Today, 14:32',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    type: 'incoming',
    isVideo: false,
  },
  {
    id: 'c2',
    name: 'Mom',
    time: 'Yesterday, 18:20',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    type: 'missed',
    isVideo: true,
  },
  {
    id: 'c3',
    name: 'Charlie Davis',
    time: 'Yesterday, 09:15',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    type: 'outgoing',
    isVideo: false,
  },
  {
    id: 'c4',
    name: 'Dan',
    time: 'Monday, 20:45',
    avatar: 'https://i.pravatar.cc/150?u=g4',
    type: 'incoming',
    isVideo: true,
  },
  {
    id: 'c5',
    name: 'Gym Bros',
    time: 'Sunday, 11:10',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026711d',
    type: 'missed',
    isVideo: false,
  },
];

export default function CallsScreen() {
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
          placeholder="Search calls..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          style={{ color: '#FFF', fontSize: 18, minWidth: 200 }}
          selectionColor="#FFF"
        />
      ) : 'Calls',
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

  const filteredCalls = MOCK_CALLS.filter(call => 
    call.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthBackground>
      <StatusBar style="light" />
      <FlatList
        data={filteredCalls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CallListItem 
            call={item} 
            onPress={() => console.log('Opened call info', item.name)} 
            onIconPress={() => console.log('Calling', item.name)}
          />
        )}
        ListHeaderComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="phone.fill" size={60} color={isDark ? "#333" : "#DDD"} />
            <Text style={{ color: isDark ? "#888" : "#999", marginTop: 12, fontSize: 16 }}>
              No calls found
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton iconName="phone.badge.plus" onPress={() => console.log('New call')} />
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
