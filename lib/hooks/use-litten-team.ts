import useAuthUser from '@hooks/use-auth-user'
import { LITTEN_TEAM_EMAIL_SUFFIX } from '@utils/constants'

const useLittenTeam = (): boolean => {
  const [authUser] = useAuthUser()

  if (authUser) {
    const { email = '', emailVerified = false } = authUser

    return emailVerified && email.endsWith(LITTEN_TEAM_EMAIL_SUFFIX)
  }

  return false
}

export default useLittenTeam
