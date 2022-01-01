const UI_INPUT_HEIGHT = 60
const UI_INPUT_MARGIN = 10

const styles = (theme, typography) => ({
  uiInput: {
    height: UI_INPUT_HEIGHT,
    width: '100%',
    fontSize: typography.fontSize.xxlarge,
    fontWeight: typography.fontWeight.bolder,
    marginTop: UI_INPUT_MARGIN,
    marginBottom: UI_INPUT_MARGIN,
    borderBottomWidth: 2,
    color: theme.colors.text,
  },
  uiInputActive: {
    borderBottomColor: theme.colors.text,
  },
  uiInputInactive: {
    borderBottomColor: theme.colors.neutral,
  },
  uiInputSuccess: {
    borderBottomColor: theme.colors.primary,
  },
  uiInputError: {
    color: theme.colors.danger,
    borderBottomColor: theme.colors.danger,
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
    color: theme.colors.danger,
    marginTop: -4,
  },
})

export default styles
