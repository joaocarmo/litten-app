import { UI_SELECT_OPTION_HEIGHT } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors }) => ({
  selectContainer: {
    width: '100%',
    borderWidth: 0,
  },
  selectInput: {
    height: UI_SELECT_OPTION_HEIGHT,
    width: '100%',
  },
  selectOpen: {
    borderBottomColor: colors.text,
  },
})

export default styles
