import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

interface AnimatedSplashScreenProps {
  onAnimationFinish: () => void;
}

export function AnimatedSplashScreen({ onAnimationFinish }: AnimatedSplashScreenProps) {
  const colorScheme = useColorScheme();
  
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.9);
  const letterSpacingAnim = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // Hide native splash screen as soon as this custom one is mounted
    SplashScreen.hideAsync().catch(() => {});

    // Entrance Animation Series
    fadeAnim.value = withTiming(1, { duration: 800 });
    scaleAnim.value = withSpring(1, { damping: 12 });
    letterSpacingAnim.value = withTiming(8, { duration: 1000 });

    // Exit Animation (fade out whole screen) after entrance
    setTimeout(() => {
      containerOpacity.value = withTiming(0, { duration: 600 }, () => {
        runOnJS(onAnimationFinish)();
      });
    }, 2000); // Wait 2 seconds before fading out
  }, []);

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ scale: scaleAnim.value }],
      letterSpacing: letterSpacingAnim.value,
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: containerOpacity.value,
    };
  });

  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';
  const textColor = colorScheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Animated.View 
      style={[
        StyleSheet.absoluteFill, 
        { backgroundColor, justifyContent: 'center', alignItems: 'center', zIndex: 999 }, 
        containerAnimatedStyle
      ]}
    >
      <Animated.Text style={[{ color: textColor, fontSize: 42, fontWeight: 'bold' }, textAnimatedStyle]}>
        WAVE
      </Animated.Text>
    </Animated.View>
  );
}
