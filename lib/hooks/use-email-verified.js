/**
 * @format
 * @flow
 */

import { useSelector } from 'react-redux'
import { emailVerifiedSelector } from 'store/selectors'

const useEmailVerified = (): boolean => {
  const emailVerified = useSelector(emailVerifiedSelector)

  return emailVerified
}

export default useEmailVerified
