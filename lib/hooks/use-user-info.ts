import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userInfoSelector } from 'store/selectors'
import { clearExtra, setExtra } from 'store/actions/authenticated-user'
import type { BasicUser } from 'model/types/user'

const useUserInfo = (): [
  BasicUser,
  (newUserInfo: BasicUser) => void,
  () => void,
] => {
  const dispatch = useDispatch()
  const userInfo = useSelector(userInfoSelector)
  const setUserInfo = useCallback(
    (newUserInfo) => {
      dispatch(setExtra(newUserInfo))
    },
    [dispatch],
  )
  const resetUserInfo = useCallback(() => {
    dispatch(clearExtra())
  }, [dispatch])
  return [userInfo, setUserInfo, resetUserInfo]
}

export default useUserInfo
