import { USER_AVATAR_SIZE_MINI } from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors, typography }) => ({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    top: USER_AVATAR_SIZE_MINI / 7,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.neutralLight,
  },
  avatarContainer: {
    marginRight: USER_AVATAR_SIZE_MINI / 3,
  },
  title: {
    textAlign: 'left',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bolder,
    color: colors.textAlt,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.light,
    color: colors.textAlt,
  },
  conversationOptions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

export default styles
