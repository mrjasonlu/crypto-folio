import { View, ActivityIndicator } from 'react-native';
import Text from '@src/components/Text/Text';
import currency from 'currency.js';

import styles from './styles';
import { COLORS, FONT_SIZE } from '@src/styles/theme';
import { replaceBalanceWithAsterisk } from '@src/utils/portfolioUtils';

type HeaderSummaryProps = {
  totalBalance: number;
  isLoading: boolean;
  localCurrency?: string;
  hideBalance?: boolean;
};

export default function HeaderSummary({
  totalBalance,
  localCurrency,
  isLoading,
  hideBalance,
}: HeaderSummaryProps) {
  return (
    <View style={styles.container}>
      <Text color={COLORS.WHITE_A50} fontWeight="700">
        Profit/Loss
      </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text color={COLORS.WHITE} fontSize={FONT_SIZE.lg} fontWeight="700">
          {hideBalance
            ? replaceBalanceWithAsterisk(totalBalance)
            : currency(totalBalance).format()}{' '}
          {localCurrency}
        </Text>
      )}
    </View>
  );
}
