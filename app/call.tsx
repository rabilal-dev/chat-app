import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_CHATS } from '@/constants/MockData';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function CallScreen() {
  const { id, type } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const contact = MOCK_CHATS.find(c => c.id === id) || MOCK_CHATS[0];
  const isVideo = type === 'video';

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(isVideo);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Background */}
      <View style={styles.background} />
      
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable onPress={() => router.back()} style={styles.minimizeBtn}>
          <IconSymbol name="chevron.left" size={28} color="#FFF" />
        </Pressable>
        <View style={styles.statusContainer}>
          <IconSymbol name="lock.fill" size={12} color="rgba(255,255,255,0.6)" />
          <Text style={styles.statusText}>End-to-end encrypted</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Main Content */}
      <View style={styles.centerContent}>
        <View style={styles.avatarWrapper}>
          <Image source={contact.avatar} style={styles.avatar} contentFit="cover" />
        </View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.callStatus}>Calling...</Text>
      </View>

      {/* Bottom Controls */}
      <View style={[styles.controls, { paddingBottom: insets.bottom + 40 }]}>
        <View style={styles.floatingControls}>
          <Pressable 
            onPress={() => setIsSpeaker(!isSpeaker)}
            style={[styles.controlBtn, isSpeaker && styles.controlBtnActive]}
          >
            <IconSymbol name="speaker.wave.2.fill" size={24} color={isSpeaker ? "#000" : "#FFF"} />
          </Pressable>
          
          <Pressable 
            onPress={() => setIsVideoOn(!isVideoOn)}
            style={[styles.controlBtn, isVideoOn && styles.controlBtnActive]}
          >
            <IconSymbol name={isVideoOn ? "video.fill" : "video.slash.fill"} size={24} color={isVideoOn ? "#000" : "#FFF"} />
          </Pressable>
          
          <Pressable 
            onPress={() => setIsMuted(!isMuted)}
            style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
          >
            <IconSymbol name={isMuted ? "mic.slash.fill" : "mic.fill"} size={24} color={isMuted ? "#000" : "#FFF"} />
          </Pressable>
          
          <Pressable 
            onPress={() => router.back()}
            style={[styles.controlBtn, styles.endCallBtn]}
          >
            <IconSymbol name="phone.down.fill" size={32} color="#FFF" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A1D',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#071A1D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  minimizeBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  avatarWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: '#223336',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  callStatus: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
  controls: {
    paddingHorizontal: 20,
  },
  floatingControls: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 35,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  controlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnActive: {
    backgroundColor: '#FFF',
  },
  endCallBtn: {
    backgroundColor: '#FF3B30',
    width: 64,
    height: 64,
    borderRadius: 32,
  }
});
