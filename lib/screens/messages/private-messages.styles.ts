import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography, isDark }) => ({
  timeTextStyle: {
    fontWeight: typography.fontWeight.lighter,
    color: isDark ? colors.secondaryLight : colors.neutralDark,
  },
})

export default styles
