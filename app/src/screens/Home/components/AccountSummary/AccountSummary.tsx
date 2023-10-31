import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AccountBalanceQueryKey } from '@src/providers/RealtimeTracker';
import { useQuery } from '@tanstack/react-query';
import currency from 'currency.js';
import { DividerTypes } from '@src/components/List/types';
import List from '@src/components/List/List';
import Text from '@src/components/Text/Text';
import IconPortfolio from '@assets/images/Portfolio.svg';
import IconRewards from '@assets/images/Rewards.svg';
import IconArrowRight from '@assets/images/ArrowRight.svg';
import styles from './styles';
import { AccountBalance } from '@src/common/types';

type AccountSummaryProps = {
  navigateAccounts: () => void;
  hideBalance?: boolean;
};

export default function AccountSummary({
  navigateAccounts,
  hideBalance,
}: AccountSummaryProps) {
  const { data } = useQuery({
    queryKey: AccountBalanceQueryKey,
  });

  const accountBalance = data as AccountBalance;

  const listItems = [
    {
      key: 'accounts',
      avatar: <IconPortfolio />,
      content: <Text fontWeight="600">Accounts</Text>,
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">
            {hideBalance
              ? accountBalance?.totalInLocalCurrency
                  .toString()
                  .replace(/./g, '*')
              : currency(accountBalance?.totalInLocalCurrency).format()}
          </Text>
          <TouchableOpacity
            style={styles.detailAction}
            onPress={navigateAccounts}>
            <IconArrowRight />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: 'rewards',
      avatar: <IconRewards />,
      content: <Text fontWeight="600">CoinJar Rewards</Text>,
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">
            {hideBalance
              ? accountBalance?.rewards.toString().replace(/./g, '*')
              : accountBalance?.rewards}{' '}
            points
          </Text>
          <View style={styles.detailAction} />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <List listItems={listItems} dividers={DividerTypes.inset} />
    </View>
  );
}
