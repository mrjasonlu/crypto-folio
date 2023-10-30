import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import { DividerTypes } from '@src/components/List/types';
import List from '@src/components/List/List';
import Text from '@src/components/Text/Text';

import IconPortfolio from '@assets/images/Portfolio.svg';
import IconRewards from '@assets/images/Rewards.svg';
import IconArrowRight from '@assets/images/ArrowRight.svg';
import styles from './styles';
import { FONT_SIZE } from '@src/styles/theme';

export default function Portfolio() {
  const listItems = [
    {
      avatar: <IconPortfolio />,
      content: <Text fontWeight="600">Accounts</Text>,
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">$26,807.74</Text>
          <TouchableOpacity
            style={styles.detailAction}
            onPress={() => console.log('pressed')}>
            <IconArrowRight />
          </TouchableOpacity>
        </View>
      ),
    },
    {
      avatar: <IconRewards />,
      content: <Text fontWeight="600">CoinJar Rewards</Text>,
      subContent: (
        <View style={styles.detail}>
          <Text fontWeight="500">995 points</Text>
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
