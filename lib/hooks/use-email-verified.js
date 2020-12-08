/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmailVerified } from 'store/actions/authenticated-user'
import { emailVerifiedSelector } from 'store/selectors'

const useEmailVerified = (): any[] => {
  const dispatch = useDispatch()

  const emailVerified = useSelector(emailVerifiedSelector)

  const setNewEmailVerified = useCallback(
    (newEmailVerified) => dispatch(setEmailVerified(newEmailVerified)),
    [dispatch],
  )

  return [emailVerified, setNewEmailVerified]
}

export default useEmailVerified
