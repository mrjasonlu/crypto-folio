import React from 'react';
import { View } from 'react-native';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';

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
  const {
    data, error, retry, isLoading,
  } = useQuery(query);
  console.log(JSON.stringify(data, null, 2));

  return (
    <View style={{ flex: 1, backgroundColor: '#EEE' }} />
  );
}
