import React from 'react';
import { StyleSheet, View, useWindowDimensions, useColorScheme } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface ChatBackgroundProps {
  children: React.ReactNode;
}

export default function ChatBackground({ children }: ChatBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? '#0B141A' : '#E5DDD5';
  const iconColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';

  const icons = [
    { type: 'chat', path: "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" },
    { type: 'send', path: "M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" },
    { type: 'phone', path: "M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V19.51C21 20.06 20.55 20.51 20 20.51C10.06 20.51 2 12.45 2 2.51C2 1.96 2.45 1.51 3 1.51H6C6.55 1.51 7 1.96 7 2.51C7 3.75 7.2 4.96 7.57 6.08C7.69 6.43 7.6 6.83 7.33 7.1L5.13 9.3C5.13 9.3 5.13 9.3 5.13 9.3L6.62 10.79Z" },
    { type: 'wave', path: "M2 12C2 12 5 7 12 7C19 7 22 12 22 12C22 12 19 17 12 17C5 17 2 12 2 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" }
  ];

  const renderPattern = () => {
    const pattern = [];
    const spacing = 120; // Slightly more spacing for larger icons
    
    for (let x = 0; x < width + spacing; x += spacing) {
      for (let y = 0; y < height + spacing; y += spacing) {
        const index = Math.floor((x + y) / spacing) % icons.length;
        const icon = icons[index];
        const rotation = (x * y) % 360;
        const scale = 0.8 + ((x + y) % 5) / 10; // Increased base scale from 0.5 to 0.8
        
        pattern.push(
          <G key={`${x}-${y}`} transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
            <Path d={icon.path} fill={iconColor} />
          </G>
        );
      }
    }
    return pattern;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width}>
          {renderPattern()}
        </Svg>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
