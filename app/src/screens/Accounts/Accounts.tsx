import React, { useContext } from 'react';
import { View } from 'react-native';
import Text from '@src/components/Text/Text';
import { PortfolioQueryKey } from '@src/providers/RealtimeTracker';
import { useQuery } from '@tanstack/react-query';
import { TickerPairList } from '@src/common/types';
import List from '@src/components/List/List';
import { useTranslation } from 'react-i18next';
import {
  FIAT_LIST,
  replaceBalanceWithAsterisk,
} from '@src/utils/portfolioUtils';
import styles from './styles';
import { DividerTypes } from '@src/components/List/types';
import { AccountSettingsContext } from '@src/contexts/AccountSettingsContext';
import Icons from '@src/components/Icons/AssetIcons';
import currency from 'currency.js';
import { COLORS, FONT_SIZE } from '@src/styles/theme';

export default function Accounts() {
  const { t } = useTranslation();
  const { state } = useContext(AccountSettingsContext) || {};
  const { data } =
    useQuery({
      queryKey: PortfolioQueryKey,
    }) || {};

  const assets = data as TickerPairList;
  const fiatAssets = Object.keys(assets)
    .filter(symbol => FIAT_LIST.includes(symbol))
    .map(symbol => {
      const Icon = Icons[symbol] || undefined;
      return {
        key: symbol,
        avatar: Icon && <Icon />,
        content: (
          <View>
            <Text fontWeight="600">{symbol}</Text>
            <Text
              fontSize={FONT_SIZE.sm}
              color={COLORS.MIRAGE_600}
              fontWeight="500">
              {assets[symbol].name}
            </Text>
          </View>
        ),
        subContent: (
          <View>
            <Text fontWeight="500">
              {state?.hideBalance
                ? replaceBalanceWithAsterisk(
                    assets[symbol].balanceInLocalCurrency,
                  )
                : currency(
                    assets[symbol].balanceInLocalCurrency as number,
                  ).format()}{' '}
              {state?.currency}
            </Text>
          </View>
        ),
      };
    });

  const cryptoAssets = Object.keys(assets)
    .filter(symbol => !FIAT_LIST.includes(symbol))
    .map(symbol => {
      const Icon = Icons[symbol] || undefined;
      return {
        key: symbol,
        avatar: Icon && <Icon />,
        content: (
          <View>
            <Text fontWeight="600">{symbol}</Text>
            <Text
              fontSize={FONT_SIZE.sm}
              color={COLORS.MIRAGE_600}
              fontWeight="500">
              {assets[symbol].name}
            </Text>
          </View>
        ),
        subContent: (
          <View style={styles.cryptoDetails}>
            <Text fontWeight="500">
              {state?.hideBalance
                ? replaceBalanceWithAsterisk(assets[symbol].quantity)
                : assets[symbol].quantity}{' '}
              {symbol}
            </Text>
            <Text
              fontSize={FONT_SIZE.sm}
              color={COLORS.MIRAGE_600}
              fontWeight="500">
              {state?.hideBalance
                ? replaceBalanceWithAsterisk(
                    assets[symbol].balanceInLocalCurrency,
                  )
                : currency(
                    assets[symbol].balanceInLocalCurrency as number,
                  ).format()}{' '}
              {state?.currency}
            </Text>
          </View>
        ),
      };
    });

  return (
    <View style={styles.container}>
      <Text fontSize={FONT_SIZE.xl} fontWeight="800" style={styles.heading}>
        {t('accounts.cash')}
      </Text>
      <List listItems={fiatAssets} dividers={DividerTypes.inset} />
      <Text fontSize={FONT_SIZE.xl} fontWeight="800" style={styles.heading}>
        {t('accounts.crypto')}
      </Text>
      <List listItems={cryptoAssets} dividers={DividerTypes.inset} />
    </View>
  );
}
