/**
 * @format
 * @flow
 */

import useAuthUser from 'hooks/use-auth-user'

const useLittenTeam = (): boolean => {
  const [authUser] = useAuthUser()

  if (authUser) {
    const { email = '', emailVerified = false } = authUser

    return emailVerified && email.endsWith('@litten.app')
  }

  return false
}

export default useLittenTeam
