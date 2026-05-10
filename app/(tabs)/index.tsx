import AuthBackground from "@/components/AuthBackground";
import { ChatListItem } from "@/components/ChatListItem";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { MOCK_CHATS } from "@/constants/MockData";
import { getChatList } from "@/services/chatsServices";
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

export default function ChatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const navigation = useNavigation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [allChats, setAllChats] = useState<any[]>([]);

  useEffect(() => {
    async function getChats() {
      try {
        const data = await getChatList();
        setAllChats(data.chats);
        console.log("ChatsData: ", data.chats)
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    getChats();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "left",
      headerStyle: {
        backgroundColor: isDark ? "#1F2C33" : "#7C3AED",
      },
      headerTintColor: "#FFF",
      headerTitle: isSearching
        ? () => (
            <TextInput
              autoFocus
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={{ color: "#FFF", fontSize: 18, minWidth: 200 }}
              selectionColor="#FFF"
            />
          )
        : "Wave",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 12,
            gap: 16,
          }}
        >
          {!isSearching && (
            <IconSymbol name="camera" size={24} color="#FFF" />
          )}
          <Pressable
            onPress={() => {
              if (isSearching) {
                setIsSearching(false);
                setSearchQuery("");
              } else {
                setIsSearching(true);
              }
            }}
            hitSlop={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol
              name={isSearching ? "xmark" : "magnifyingglass"}
              size={24}
              color="#FFF"
            />
          </Pressable>
          {!isSearching && (
            <Pressable
              onPress={() => router.push("/profile" as any)}
              hitSlop={10}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <IconSymbol name="ellipsis" size={24} color="#FFF" />
            </Pressable>
          )}
        </View>
      ),
    });
  }, [navigation, isSearching, searchQuery, router, isDark]);

  const filteredChats = MOCK_CHATS.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AuthBackground>
      <StatusBar style="light" />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            chat={item}
            onPress={() => router.push(`/chat/${item.id}` as any)}
          />
        )}
        ListHeaderComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol name="bubble.right.fill" size={60} color={isDark ? "#333" : "#DDD"} />
            <Text style={{ color: isDark ? "#888" : "#999", marginTop: 12, fontSize: 16 }}>
              No chats found
            </Text>
          </View>
        }
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      />
      <FloatingActionButton
        onPress={() => navigation.navigate("new-chat" as never)}
      />
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 100,
  },
});
