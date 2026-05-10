import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_CHATS } from '@/constants/MockData';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatBackground from '@/components/ChatBackground';

interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hey, how are you?', time: '10:00 AM', isMe: false },
  { id: '2', text: 'I am good, thanks! How about you?', time: '10:05 AM', isMe: true, status: 'read' },
  { id: '3', text: 'Doing well. Are we still meeting today?', time: '10:06 AM', isMe: false },
  { id: '4', text: 'Yes, at 5 PM at the usual place.', time: '10:10 AM', isMe: true, status: 'delivered' },
  { id: '5', text: 'Perfect, see you then!', time: '10:11 AM', isMe: false },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const flatListRef = useRef<FlatList>(null);

  const contact = MOCK_CHATS.find(c => c.id === id) || MOCK_CHATS[0];

  const sendMessage = () => {
    if (message.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Got it! 👍",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <View style={[
        styles.messageWrapper,
        item.isMe ? styles.myMessageWrapper : styles.theirMessageWrapper
      ]}>
        <View style={[
          styles.messageBubble,
          item.isMe
            ? [styles.myMessageBubble, { backgroundColor: isDark ? '#4C1D95' : '#DDD6FE' }]
            : [styles.theirMessageBubble, { backgroundColor: isDark ? '#1F2C33' : '#FFF' }]
        ]}>
          <Text style={[styles.messageText, { color: isDark ? '#E9EDEF' : '#000' }]}>
            {item.text}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[styles.messageTime, { color: isDark ? 'rgba(233, 237, 239, 0.6)' : 'rgba(0, 0, 0, 0.45)' }]}>
              {item.time}
            </Text>
            {item.isMe && (
              <IconSymbol
                name={item.status === 'read' ? 'checkmark.all' : 'checkmark'}
                size={16}
                color={item.status === 'read' ? '#53BDEB' : (isDark ? 'rgba(233, 237, 239, 0.6)' : 'rgba(0, 0, 0, 0.45)')}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ChatBackground>
      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top, backgroundColor: isDark ? '#1F2C33' : '#5B21B6' }]}>
        <View style={styles.headerContent}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={28} color="#FFF" />
          </Pressable>
          <Pressable style={styles.backButton}>
            <Image
              source={contact.avatar}
              style={styles.headerAvatar}
            />
          </Pressable>
          <Pressable style={styles.headerInfo}>
            <Text style={styles.headerName} numberOfLines={1}>{contact.name}</Text>
            <Text style={styles.headerStatus}>online</Text>
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable 
              style={styles.headerActionIcon}
              onPress={() => router.push({ pathname: '/call', params: { id: contact.id, type: 'video' } })}
            >
              <IconSymbol name="video.fill" size={22} color="#FFF" />
            </Pressable>
            <Pressable 
              style={styles.headerActionIcon}
              onPress={() => router.push({ pathname: '/call', params: { id: contact.id, type: 'audio' } })}
            >
              <IconSymbol name="phone.fill" size={20} color="#FFF" />
            </Pressable>
            <Pressable style={styles.headerActionIcon}>
              <IconSymbol name="ellipsis" size={24} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
        style={{ flex: 1 }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={[styles.messageList, { paddingBottom: 20 }]}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input Bar */}
        <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 8 }]}>
          <View style={[styles.inputWrapper, { backgroundColor: isDark ? '#1F2C33' : '#FFF' }]}>
            <Pressable style={styles.iconButton}>
              <IconSymbol name="plus" size={24} color={isDark ? '#8696A0' : '#5B21B6'} />
            </Pressable>
            <TextInput
              style={[styles.input, { color: isDark ? '#E9EDEF' : '#000' }]}
              placeholder="Message"
              placeholderTextColor={isDark ? '#8696A0' : '#888'}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <Pressable style={styles.iconButton}>
              <IconSymbol name="camera" size={24} color={isDark ? '#8696A0' : '#8696A0'} />
            </Pressable>
          </View>
          <Pressable
            style={[styles.sendButton, { backgroundColor: '#5B21B6' }]}
            onPress={sendMessage}
          >
            <IconSymbol
              name={message.trim().length > 0 ? "paperplane.fill" : "mic.fill"}
              size={24}
              color="#FFF"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ChatBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: Platform.OS === 'ios' ? 100 : 90,
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 56,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: -4,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  headerName: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  headerStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionIcon: {
    padding: 8,
    marginLeft: 4,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageWrapper: {
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  theirMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  myMessageBubble: {
    borderTopRightRadius: 2,
  },
  theirMessageBubble: {
    borderTopLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 11,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    fontSize: 17,
    maxHeight: 120,
    marginHorizontal: 8,
    paddingVertical: 4,
  },
  iconButton: {
    padding: 6,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
