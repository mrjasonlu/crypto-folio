import React from 'react';
import { View } from 'react-native';
import Logo from '@assets/images/CoinJarLogo.svg';
import Brand from '@assets/images/Brand.svg';
import styles from './styles';
import Text from '../Text/Text';
import { COLORS, FONT_SIZE } from '@src/styles/theme';

type HeaderProps = {
  showLogo?: boolean;
  title?: string;
};

export default function Header({ showLogo = true, title }: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      {showLogo && (
        <View style={styles.brandWrapper}>
          <Logo height={40} width={40} />
          <View style={styles.brand}>
            <Brand width={115} />
          </View>
          <View style={styles.brandAlignHelper} />
        </View>
      )}
      {title && (
        <View style={styles.title}>
          <Text color={COLORS.WHITE} fontSize={FONT_SIZE.xl} fontWeight="700">
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}
