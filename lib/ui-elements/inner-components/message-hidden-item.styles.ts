import { UI_HIDDEN_OPTION_WIDTH, UI_PRESSED_OPACITY } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiMessageHiddenItem: {
    minWidth: UI_HIDDEN_OPTION_WIDTH,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutralDark,
    opacity: 1,
  },
  uiMessageHiddenItemText: {
    color: colors.textAlt,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bolder,
  },
  uiMessageHiddenItemPressed: {
    opacity: UI_PRESSED_OPACITY,
  },
})

export default styles
