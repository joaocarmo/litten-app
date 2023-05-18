import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.text,
  },
  text: {
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.bolder,
  },
})

export default styles
