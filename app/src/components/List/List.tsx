import { View } from 'react-native';
import ListItem, { ListItemProps } from './ListItem';
import styles from './styles';
import { Divider } from './types';

type ListProps = {
  listItems: ListItemProps[];
  dividers?: Divider;
};

export default function List({ dividers, listItems }: ListProps) {
  const listItemView = listItems.map(
    ({ key, avatar, content, subContent }, i) => (
      <ListItem
        key={key}
        avatar={avatar}
        content={content}
        subContent={subContent}
        dividers={dividers}
        lastItem={i === listItems.length - 1}
      />
    ),
  );

  return <View style={styles.container}>{listItemView}</View>;
}
