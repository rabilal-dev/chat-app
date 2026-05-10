import { IconSymbol } from '@/components/ui/icon-symbol';
import { MOCK_STATUSES } from '@/constants/MockData';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function StatusView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const status = MOCK_STATUSES.find((s) => s.id === id);

  // If status is not found, we close the viewer
  if (!status) {
    if (router.canGoBack()) router.back();
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background Media - Immersive Status Content */}
      <Image
        source={status.avatar} // Mocking status content with avatar for demonstration
        style={styles.backgroundMedia}
        contentFit="cover"
        blurRadius={15} // Aesthetic blur for avatar-based mock
      />
      <View style={styles.darkOverlay} />

      {/* Progress Bars - WhatsApp Style */}
      <View style={[styles.progressContainer, { top: insets.top + 10 }]}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '70%' }]} />
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '0%' }]} />
        </View>
      </View>

      {/* Header Overlay - User Context */}
      <View style={[styles.header, { top: insets.top + 25 }]}>
        <View style={styles.userInfo}>
          <Pressable onPress={() => router.back()} style={styles.backIcon}>
            <IconSymbol name="chevron.left" size={28} color="#FFF" />
          </Pressable>
          <Image 
            source={status.avatar} 
            style={styles.avatar} 
          />
          <View>
            <Text style={styles.name}>{status.name}</Text>
            <Text style={styles.time}>{status.time}</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <Pressable style={styles.actionIcon}>
            <IconSymbol name="ellipsis.vertical" size={24} color="#FFF" />
          </Pressable>
          <Pressable onPress={() => router.back()} style={styles.actionIcon}>
            <IconSymbol name="xmark" size={24} color="#FFF" />
          </Pressable>
        </View>
      </View>

      {/* Reply Section - Interaction */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <Pressable style={styles.swipeHint}>
          <IconSymbol name="chevron.up" size={24} color="#FFF" />
          <Text style={styles.replyHintText}>Reply</Text>
        </Pressable>
        
        <View style={styles.replyBar}>
          <View style={styles.replyInputWrapper}>
            <TextInput
              placeholder="Type a reply..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              style={styles.replyInput}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundMedia: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  progressContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    gap: 4,
  },
  progressBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backIcon: {
    padding: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  time: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    padding: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  swipeHint: {
    alignItems: 'center',
    marginBottom: 12,
  },
  replyHintText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: -4,
  },
  replyBar: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  replyInputWrapper: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  replyInput: {
    color: '#FFF',
    fontSize: 16,
  },
});
