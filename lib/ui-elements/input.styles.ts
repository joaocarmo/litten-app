import type { ThemeFunction } from '@styles/types'

const UI_INPUT_HEIGHT = 60
const UI_INPUT_MARGIN = 10

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiInput: {
    height: UI_INPUT_HEIGHT,
    width: '100%',
    fontSize: typography.fontSize.xxlarge,
    fontWeight: typography.fontWeight.bolder,
    marginTop: UI_INPUT_MARGIN,
    marginBottom: UI_INPUT_MARGIN,
    borderBottomWidth: 2,
    color: colors.text,
  },
  uiInputActive: {
    borderBottomColor: colors.text,
  },
  uiInputInactive: {
    borderBottomColor: colors.neutral,
  },
  uiInputSuccess: {
    borderBottomColor: colors.primary,
  },
  uiInputError: {
    color: colors.danger,
    borderBottomColor: colors.danger,
  },
  uiInputSmall: {
    height: UI_INPUT_HEIGHT * 0.5,
    fontSize: typography.fontSize.base,
    marginTop: UI_INPUT_MARGIN * 0.5,
    marginBottom: UI_INPUT_MARGIN * 0.5,
  },
  errorMessage: {
    width: '100%',
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: -4,
  },
})

export default styles
