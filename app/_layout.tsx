import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AnimatedSplashScreen } from '@/components/AnimatedSplashScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/authStore';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => { });

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashComplete, setSplashComplete] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isSplashComplete) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace('/login' as any);
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to tabs if authenticated and in auth group
      router.replace('/' as any);
    }
  }, [isAuthenticated, segments, isSplashComplete]);

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="call" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="profile" options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#7C3AED',
            },
            headerTintColor: '#FFF',
          }} />
          <Stack.Screen name="new-chat" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="status/[id]" options={{ 
            presentation: 'fullScreenModal', 
            headerShown: false,
            animation: 'fade',
          }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>

      {!isSplashComplete && (
        <AnimatedSplashScreen
          onAnimationFinish={() => setSplashComplete(true)}
        />
      )}
    </>
  );
}
