import { StyleSheet } from 'react-native'
import type { ThemeFunction } from '@styles/types'

const bulletSize = 6
const bulletSizeBig = bulletSize + 2

const styles: ThemeFunction = ({ colors }) => ({
  bullet: {
    height: bulletSize,
    width: bulletSize,
    borderRadius: bulletSize / 2,
    marginHorizontal: 5,
    opacity: 0.5,
    backgroundColor: colors.backgroundAlt,
  },
  bulletActive: {
    opacity: 0.6,
  },
  bulletInactive: {
    opacity: 0.2,
  },
  bulletContrast: {
    height: bulletSizeBig,
    width: bulletSizeBig,
    borderRadius: bulletSizeBig / 2,
    borderColor: colors.textAlt,
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
  },
})

export default styles
