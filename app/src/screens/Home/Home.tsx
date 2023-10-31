import React from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Text from '@src/components/Text/Text';
import AccountSummary from './components/AccountSummary/AccountSummary';
import HeaderSummary from './components/HeaderSummary/HeaderSummary';
import { AccountSettingsContext } from '@src/contexts/AccountSettingsContext';
import {
  AccountBalanceQueryKey,
  RealTimeTrackerStateQueryKey,
} from '@src/providers/RealtimeTracker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from './styles';
import { COLORS, FONT_SIZE } from '@src/styles/theme';
import { AccountBalance, RealtimeTrackerState } from '@src/common/types';

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: AccountBalanceQueryKey,
  });

  const { data: trackerState } = useQuery({
    queryKey: RealTimeTrackerStateQueryKey,
  });

  const { hasError, isLoading } = (trackerState as RealtimeTrackerState) || {};

  const accountBalance = data as AccountBalance;

  const { state, dispatch } = React.useContext(AccountSettingsContext) || {};

  if (hasError) {
    Alert.alert(t('error.api.title'), t('error.api.message'));
  }

  return (
    <View style={styles.container}>
      <HeaderSummary
        totalBalance={accountBalance?.totalInLocalCurrency}
        localCurrency={state?.currency}
        hideBalance={state?.hideBalance}
        isLoading={isLoading}
      />
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <Text fontWeight="700" fontSize={FONT_SIZE.xl}>
            {t('home.title')}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch?.({ type: 'toggle_hide_balance' })}
            style={styles.hideBalanceButton}
            accessibilityLabel={t('home.hide_balance')}>
            <Text fontSize={FONT_SIZE.sm} color={COLORS.BLUE_600}>
              {t('home.hide_balance')}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <AccountSummary
            navigateAccounts={() => navigation.navigate('Accounts')}
            hideBalance={state?.hideBalance}
          />
        )}
      </View>
    </View>
  );
}
