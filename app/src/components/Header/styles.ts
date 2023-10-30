import { COLORS } from '@src/styles/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    height: 'auto',
    backgroundColor: COLORS.BLUE_600,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  brandWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    flexGrow: 0,
  },
  brandAlignHelper: {
    flexGrow: 0,
    width: 34,
    height: 34,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
