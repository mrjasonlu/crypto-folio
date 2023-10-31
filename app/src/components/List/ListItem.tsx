import { View } from 'react-native';
import styles from './styles';
import { Divider } from './types';

export type ListItemProps = {
  key: string;
  avatar: JSX.Element;
  content: JSX.Element;
  subContent: JSX.Element;
  dividers?: Divider;
  lastItem?: boolean;
};

export default function ListItem({
  avatar,
  content,
  subContent,
  dividers,
  lastItem,
}: ListItemProps) {
  return (
    <View style={styles.listItem}>
      <View style={styles.listItemAvatar}>{avatar}</View>
      <View
        style={[
          styles.listItemContentWrapper,
          dividers && !lastItem ? styles.divider : null,
        ]}>
        <View style={styles.listItemContent}>{content}</View>
        <View style={styles.listItemContentSub}>{subContent}</View>
      </View>
    </View>
  );
}
