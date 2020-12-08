/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoSelector } from 'store/selectors'
import { setExtra } from 'store/actions/authenticated-user'

const useUserInfo = (): any[] => {
  const dispatch = useDispatch()

  const userInfo = useSelector(userInfoSelector)

  const setUserInfo = useCallback(
    (newUserInfo) => dispatch(setExtra(newUserInfo)),
    [dispatch],
  )

  return [userInfo, setUserInfo]
}

export default useUserInfo
