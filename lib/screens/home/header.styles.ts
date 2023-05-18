import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  filtersContainer: {
    flexGrow: 1,
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersText: {
    color: colors.textAlt,
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bolder,
  },
})

export default styles
