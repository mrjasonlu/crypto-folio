import { Text as NativeText, StyleProp, TextStyle } from 'react-native';
import { COLORS, FONT_SIZE } from '@src/styles/theme';

type TextProps = {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function Text({
  color = COLORS.BLACK,
  fontSize = FONT_SIZE.md,
  fontWeight = '400',
  children,
  style,
}: TextProps) {
  return (
    <NativeText style={[{ color, fontSize, fontWeight }, style]}>
      {children}
    </NativeText>
  );
}
