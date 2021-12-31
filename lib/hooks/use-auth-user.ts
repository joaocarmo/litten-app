import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUserSelector } from 'store/selectors'
import { clearBasic, setBasic } from 'store/actions/authenticated-user'
import type { BasicAuthUser } from 'store/types'

const useAuthUser = (): [
  BasicAuthUser | null,
  (newUserInfo: BasicAuthUser) => void,
  () => void,
] => {
  const dispatch = useDispatch()
  const authUser = useSelector(authUserSelector)
  const setAuthUser = useCallback(
    (newUserInfo) => {
      dispatch(setBasic(newUserInfo))
    },
    [dispatch],
  )
  const resetAuthUser = useCallback(() => {
    dispatch(clearBasic())
  }, [dispatch])
  return [authUser, setAuthUser, resetAuthUser]
}

export default useAuthUser
