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
import { replaceBalanceWithAsterisk } from '@src/utils/portfolioUtils';

type AccountSummaryProps = {
  navigateAccounts: () => void;
  hideBalance?: boolean;
};

export default function AccountSummary({
  navigateAccounts,
  hideBalance,
}: AccountSummaryProps) {
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: AccountBalanceQueryKey,
  });

  const accountBalance = data as AccountBalance;

  const listItems = [
    {
      key: 'accounts',
      avatar: <IconPortfolio />,
      content: (
        <Text fontWeight="600">{t('home.account_summary.accounts')}</Text>
      ),
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">
            {hideBalance
              ? replaceBalanceWithAsterisk(accountBalance?.totalInLocalCurrency)
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
      content: (
        <Text fontWeight="600">{t('home.account_summary.rewards')}</Text>
      ),
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">
            {hideBalance
              ? replaceBalanceWithAsterisk(accountBalance?.rewards)
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
