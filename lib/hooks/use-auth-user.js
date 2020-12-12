/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUserSelector } from 'store/selectors'
import { setBasic } from 'store/actions/authenticated-user'
import type { BasicAuthUser } from 'store/types'

const useAuthUser = (): [BasicAuthUser | null, any] => {
  const dispatch = useDispatch()

  const authUser = useSelector(authUserSelector)

  const setAuthUser = useCallback(
    (newUserInfo) => dispatch(setBasic(newUserInfo)),
    [dispatch],
  )

  return [authUser, setAuthUser]
}

export default useAuthUser
