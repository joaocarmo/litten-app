/**
 * @format
 * @flow
 */

import { useSelector } from 'react-redux'
import { authUserSelector } from 'store/selectors'
import type { BasicAuthUser } from 'store/types'

const useAuthUser = (): BasicAuthUser | null => {
  const authUser = useSelector(authUserSelector)

  return authUser
}

export default useAuthUser
