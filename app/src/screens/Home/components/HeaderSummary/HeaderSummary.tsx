import { View } from 'react-native';
import Text from '@src/components/Text/Text';

import styles from './styles';
import { COLORS, FONT_SIZE } from '@src/styles/theme';

export default function HeaderSummary() {
  return (
    <View style={styles.container}>
      <Text color={COLORS.WHITE_A50} fontWeight="700">
        Profit/Loss
      </Text>
      <Text color={COLORS.WHITE} fontSize={FONT_SIZE.lg} fontWeight="700">
        $42,123.13 AUD
      </Text>
    </View>
  );
}
