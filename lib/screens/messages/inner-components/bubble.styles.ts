import { StyleSheet } from 'react-native'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography, isDark }) => ({
  tickStyle: {
    color: colors.neutralDark,
  },
  textStyle: {
    color: isDark ? colors.textAlt : colors.text,
    fontWeight: typography.fontWeight.lighter,
  },
  wrapperCommonStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.neutral,
    marginTop: 1,
    marginBottom: 1,
  },
  wrapperStyleLeft: {
    backgroundColor: colors.background,
  },
  wrapperStyleRight: {
    backgroundColor: `${colors.secondaryLight}10`,
  },
})

export default styles
