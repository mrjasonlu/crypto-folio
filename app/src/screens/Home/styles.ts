import { COLORS, FONT_SIZE } from '@src/styles/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hideBalanceButton: {
    marginLeft: 'auto',
  },
});

export default styles;
