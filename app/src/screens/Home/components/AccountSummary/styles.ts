import { COLORS } from '@src/styles/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    marginTop: 6,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailAction: {
    width: 10,
    marginLeft: 8,
    marginRight: 4,
  },
});

export default styles;
