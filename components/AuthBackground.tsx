import React from 'react';
import { StyleSheet, View, useWindowDimensions, useColorScheme } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? '#0B141A' : '#F8FAFC';
  const primaryColor = '#7C3AED';

  const IconGroup = ({ x, y, rotation, scale = 1, opacity = 0.05, type }: { x: number, y: number, rotation: number, scale?: number, opacity?: number, type: 'chat' | 'send' | 'wave' | 'phone' }) => {
    let path = "";
    if (type === 'chat') {
      path = "M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z";
    } else if (type === 'send') {
      path = "M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z";
    } else if (type === 'wave') {
      path = "M2 12C2 12 5 7 12 7C19 7 22 12 22 12C22 12 19 17 12 17C5 17 2 12 2 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z";
    } else if (type === 'phone') {
      path = "M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V19.51C21 20.06 20.55 20.51 20 20.51C10.06 20.51 2 12.45 2 2.51C2 1.96 2.45 1.51 3 1.51H6C6.55 1.51 7 1.96 7 2.51C7 3.75 7.2 4.96 7.57 6.08C7.69 6.43 7.6 6.83 7.33 7.1L5.13 9.3C5.13 9.3 5.13 9.3 5.13 9.3L6.62 10.79Z";
    }

    return (
      <G transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
        <Path d={path} fill={primaryColor} opacity={opacity} />
      </G>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={StyleSheet.absoluteFill}>
        <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.1" />
              <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.02" />
            </LinearGradient>
            <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={primaryColor} stopOpacity="0.05" />
              <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.01" />
            </LinearGradient>
          </Defs>

          {/* Top Left Blob */}
          <Circle
            cx={width * 0.1}
            cy={height * 0.1}
            r={width * 0.4}
            fill="url(#grad1)"
          />

          {/* Bottom Right Blob */}
          <Circle
            cx={width * 0.9}
            cy={height * 0.9}
            r={width * 0.5}
            fill="url(#grad2)"
          />

          {/* Thematic Icons */}
          <IconGroup x={width * 0.8} y={height * 0.1} rotation={-15} scale={2.5} type="chat" opacity={0.08} />
          <IconGroup x={width * 0.15} y={height * 0.45} rotation={20} scale={2.2} type="send" opacity={0.06} />
          <IconGroup x={width * 0.85} y={height * 0.65} rotation={-10} scale={2.8} type="wave" opacity={0.05} />
          <IconGroup x={width * 0.1} y={height * 0.8} rotation={15} scale={2.3} type="phone" opacity={0.07} />
          <IconGroup x={width * 0.5} y={height * 0.25} rotation={45} scale={2.1} type="chat" opacity={0.04} />
          <IconGroup x={width * 0.4} y={height * 0.85} rotation={-30} scale={2.4} type="send" opacity={0.05} />

          {/* Decorative Path */}
          <Path
            d={`M0 ${height * 0.2} Q ${width * 0.5} ${height * 0.1} ${width} ${height * 0.25}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />

          <Path
            d={`M0 ${height * 0.8} Q ${width * 0.3} ${height * 0.9} ${width} ${height * 0.75}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
          
          {/* Scattered dots for texture */}
          <Circle cx={width * 0.2} cy={height * 0.4} r="2" fill={primaryColor} fillOpacity="0.1" />
          <Circle cx={width * 0.8} cy={height * 0.15} r="3" fill={primaryColor} fillOpacity="0.1" />
          <Circle cx={width * 0.5} cy={height * 0.6} r="1.5" fill={primaryColor} fillOpacity="0.1" />
          <Circle cx={width * 0.1} cy={height * 0.85} r="2.5" fill={primaryColor} fillOpacity="0.1" />
          <Circle cx={width * 0.9} cy={height * 0.45} r="2" fill={primaryColor} fillOpacity="0.1" />
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
