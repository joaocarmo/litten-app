import { StyleSheet } from 'react-native'

const styles = (theme, typography, isDark) => ({
  tickStyle: {
    color: theme.colors.neutralDark,
  },
  textStyle: {
    color: isDark ? theme.colors.textAlt : theme.colors.text,
    fontWeight: typography.fontWeight.lighter,
  },
  wrapperCommonStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.neutral,
    marginTop: 1,
    marginBottom: 1,
  },
  wrapperStyleLeft: {
    backgroundColor: theme.colors.background,
  },
  wrapperStyleRight: {
    backgroundColor: `${theme.colors.secondaryLight}10`,
  },
})

export default styles
