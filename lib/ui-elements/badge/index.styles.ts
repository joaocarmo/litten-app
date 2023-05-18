import type { ThemeFunction } from '@styles/types'
import {
  UI_BADGE_ELEMENT_OFFSET,
  UI_BADGE_PADDING,
  UI_BADGE_SIZE,
} from '@utils/constants'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiBadgeContainer: {
    position: 'relative',
  },
  uiBadgeNumber: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: UI_BADGE_SIZE,
    minWidth: UI_BADGE_SIZE,
    top: -UI_BADGE_ELEMENT_OFFSET / 2,
    right: -UI_BADGE_ELEMENT_OFFSET,
    padding: UI_BADGE_PADDING,
    borderRadius: UI_BADGE_SIZE,
    backgroundColor: colors.danger,
    zIndex: 1,
  },
  uiBadgeNumberText: {
    color: colors.textAlt,
    fontSize: typography.fontSize.xxsmall,
    fontWeight: typography.fontWeight.bolder,
    textAlign: 'center',
  },
})

export default styles
