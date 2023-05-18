import {
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  headerContainer: {
    height: '100%',
    width: STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  },
  headerContentContainer: {
    flex: 1,
    flexGrow: 16,
  },
  headerText: {
    fontSize: typography.fontSize.xxlarge,
    fontWeight: typography.fontWeight.bolder,
    textAlign: 'left',
    color: colors.textAlt,
  },
  headerTextCentered: {
    textAlign: 'center',
  },
})

export default styles
