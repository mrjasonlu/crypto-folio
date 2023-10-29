import React from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import { useTranslation } from 'react-i18next';
import styles from './styles';

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
  console.log(JSON.stringify(data, null, 2));
  console.log('data', data);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text>{t('home.title')}</Text>
      </View>
    </View>
  );
}
