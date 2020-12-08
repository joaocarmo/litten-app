/**
 * @format
 * @flow
 */

import { useSelector } from 'react-redux'
import { authUserSelector } from 'store/selectors'

const useAuthUser = () => {
  const authUser = useSelector(authUserSelector)

  return authUser ?? ''
}

export default useAuthUser
