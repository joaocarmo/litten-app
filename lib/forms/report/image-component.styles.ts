import {
  MAX_NUM_OF_REPORT_IMAGES,
  UI_ELEMENT_BORDER_RADIUS,
  USER_AVATAR_SIZE_MEDIUM,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const FLEX_BASIS = (0.95 * (1 / MAX_NUM_OF_REPORT_IMAGES) * 100).toFixed(1)

const styles: ThemeFunction = ({ colors }) => ({
  reportImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: USER_AVATAR_SIZE_MEDIUM,
    flexBasis: `${FLEX_BASIS}%`,
    aspectRatio: 1,
    borderRadius: UI_ELEMENT_BORDER_RADIUS,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  reportImage: {
    height: '100%',
    width: '100%',
  },
})

export default styles
