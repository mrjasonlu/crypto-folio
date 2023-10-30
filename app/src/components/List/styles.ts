import { StyleSheet } from 'react-native';
import { COLORS } from '@src/styles/theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    borderRadius: 16,
    backgroundColor: COLORS.WHITE,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
  },
  listItemContentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
    paddingRight: 18,
  },
  listItemContentWrapperLast: {
    borderBottomWidth: 0,
  },
  listItemContent: {
    display: 'flex',
    paddingVertical: 16,
    color: COLORS.BLACK,
  },
  listItemContentSub: {
    marginLeft: 'auto',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.GREY_100,
  },
});

export default styles;
