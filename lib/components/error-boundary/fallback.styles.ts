import { STRUCTURE_TEMPLATE_SCREEN_PADDING } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.neutralLight,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_PADDING,
  },
  centeredText: {
    textAlign: 'center',
  },
})

export default styles
