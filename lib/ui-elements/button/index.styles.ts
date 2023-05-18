import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  UI_BUTTON_BORDER_RADIUS,
  UI_BUTTON_FIXED_WIDTH,
  UI_PRESSED_OPACITY,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiButton: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    borderRadius: UI_BUTTON_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  fluid: {
    flex: 1,
    width: '100%',
  },
  notFluid: {
    width: UI_BUTTON_FIXED_WIDTH,
  },
  compact: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  uiButtonText: {
    color: colors.textAlt,
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bolder,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  pressedStyle: {
    opacity: UI_PRESSED_OPACITY,
  },
  disabled: {
    opacity: 0.3,
  },
})

export default styles
