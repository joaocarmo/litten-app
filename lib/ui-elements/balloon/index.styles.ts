import { StyleSheet } from 'react-native'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiBalloon: {
    padding: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  uiBalloonError: {
    borderColor: colors.dangerDark,
    backgroundColor: colors.dangerLight,
  },
  uiBalloonNormalError: {
    color: colors.dangerDark,
  },
  uiBalloonInfo: {
    borderColor: colors.secondaryLight,
    backgroundColor: colors.secondaryLighter,
  },
  uiBalloonNormalInfo: {
    color: colors.neutralDark,
  },
  uiBalloonNormal: {
    borderColor: colors.neutralDark,
    backgroundColor: colors.neutralLight,
  },
  uiBalloonNormalText: {
    color: colors.text,
  },
  uiBalloonText: {
    fontWeight: typography.fontWeight.light,
  },
})

export default styles
