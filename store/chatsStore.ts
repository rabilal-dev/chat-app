import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const storage = createJSONStorage(() =>
    Platform.OS === 'web' && typeof window !== 'undefined'
        ? localStorage
        : AsyncStorage
);

export interface Chat {
    dbContact: any;
    deviceContact: any;
}

interface ChatsStore {
    chats: Chat[];
    setChats: (chats: Chat[]) => void;
    addChat: (chat: Chat) => void;
    addChats: (chats: Chat[]) => void;
    updateChat: (chatId: string, updates: Partial<Chat>) => void;
    removeChat: (chatId: string) => void;
    clearChats: () => void;
    getChatById: (chatId: string) => Chat | undefined;
}

/**
 * Extracts a unique identifier from the chat.
 * Adjust this if your actual id field differs.
 */
const getChatId = (chat: Chat) =>
    chat?.dbContact?.id ||
    chat?.dbContact?._id ||
    chat?.deviceContact?.id;

export const useChatsStore = create<ChatsStore>()(
    persist(
        (set, get) => ({
            chats: [],

            setChats: (chats) => {
                // Remove duplicates before storing
                const uniqueChats = chats.filter(
                    (chat, index, array) =>
                        index ===
                        array.findIndex(
                            (item) => getChatId(item) === getChatId(chat)
                        )
                );

                set({ chats: uniqueChats });
            },

            addChat: (chat) => {
                const chatId = getChatId(chat);
                const existing = get().chats;

                const alreadyExists = existing.some(
                    (item) => getChatId(item) === chatId
                );

                if (alreadyExists) {
                    // Merge updates into the existing chat
                    set({
                        chats: existing.map((item) =>
                            getChatId(item) === chatId
                                ? { ...item, ...chat }
                                : item
                        ),
                    });
                    return;
                }

                set({
                    chats: [...existing, chat],
                });
            },

            addChats: (newChats) => {
                const currentChats = get().chats;
                const map = new Map<string, Chat>();

                // Add existing chats
                currentChats.forEach((chat) => {
                    map.set(getChatId(chat), chat);
                });

                // Add/overwrite with new chats
                newChats.forEach((chat) => {
                    map.set(getChatId(chat), chat);
                });

                set({
                    chats: Array.from(map.values()),
                });
            },

            updateChat: (chatId, updates) => {
                set((state) => ({
                    chats: state.chats.map((chat) =>
                        getChatId(chat) === chatId
                            ? { ...chat, ...updates }
                            : chat
                    ),
                }));
            },

            removeChat: (chatId) => {
                set((state) => ({
                    chats: state.chats.filter(
                        (chat) => getChatId(chat) !== chatId
                    ),
                }));
            },

            clearChats: () => {
                set({ chats: [] });
            },

            getChatById: (chatId) => {
                return get().chats.find(
                    (chat) => getChatId(chat) === chatId
                );
            },
        }),
        {
            name: 'chats-storage',
            storage,

            // Persist only the chats array
            partialize: (state) => ({
                chats: state.chats,
            }),
        }
    )
);