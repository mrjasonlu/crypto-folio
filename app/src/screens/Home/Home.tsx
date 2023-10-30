import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import { useTranslation } from 'react-i18next';

import Text from '@src/components/Text/Text';
import Portfolio from './components/Portfolio/Portfolio';
import HeaderSummary from './components/HeaderSummary/HeaderSummary';
import { UserSettingsContext } from '@src/contexts/UserSettingsContext';

import styles from './styles';
import { COLORS, FONT_SIZE } from '@src/styles/theme';

const query = graphql`
  query HomeQuery {
    rewards
    portfolio {
      assets {
        quantity
        profitOrLoss
        currency {
          symbol
          name
        }
      }
    }
  }
`;

export default function Home({ navigation }) {
  const { t } = useTranslation();
  const { data, error, retry, isLoading } = useQuery(query);

  const { hideBalance, toggleHideBalance } =
    React.useContext(UserSettingsContext);
  console.log(hideBalance);
  console.log('data', data);

  return (
    <View style={styles.container}>
      <HeaderSummary />
      <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <Text fontWeight="700" fontSize={FONT_SIZE.xl}>
            {t('home.title')}
          </Text>
          <TouchableOpacity
            onPress={toggleHideBalance}
            style={styles.hideBalanceButton}
            accessibilityLabel={t('home.hide_balance')}>
            <Text fontSize={FONT_SIZE.sm} color={COLORS.BLUE_600}>
              {t('home.hide_balance')}
            </Text>
          </TouchableOpacity>
        </View>
        <Portfolio />
      </View>
    </View>
  );
}
