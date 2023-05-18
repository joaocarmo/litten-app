import { STRUCTURE_TAB_NAV_HEIGHT } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.neutralLight,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    alignItems: 'center',
    marginBottom: STRUCTURE_TAB_NAV_HEIGHT / 2,
  },
})

export default styles
