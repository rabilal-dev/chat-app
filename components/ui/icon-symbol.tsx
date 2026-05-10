// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';


/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'bubble.right.fill': 'chat',
  'circle.dashed': 'data-usage',
  'plus': 'add',
  'magnifyingglass': 'search',
  'camera': 'camera-alt',
  'ellipsis': 'more-vert',
  'xmark': 'close',
  'person.3.fill': 'groups',
  'phone.fill': 'call',
  'video.fill': 'videocam',
  'arrow.down.left': 'call-received',
  'arrow.up.right': 'call-made',
  'phone.badge.plus': 'add-call',
  'chevron.left': 'chevron-left',
  'checkmark': 'done',
  'checkmark.all': 'done-all',
  'mic.fill': 'mic',
  'mic.slash.fill': 'mic-off',
  'speaker.wave.2.fill': 'volume-up',
  'video.slash.fill': 'videocam-off',
  'phone.down.fill': 'call-end',
  'lock.fill': 'lock',
  'pencil': 'edit',
  'info.circle': 'info',
  'person.fill': 'person',
  'rectangle.portrait.and.arrow.right': 'logout',
  'plus.circle.fill': 'add-circle',
  'ellipsis.vertical': 'more-vert',
  'camera.fill': 'camera-alt',
  'chevron.up': 'keyboard-arrow-up',
} as const;

type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
