import { useSelector } from 'react-redux'
import { userUidSelector } from '@store/selectors'

const useUserUid = (): string => {
  const userUid = useSelector(userUidSelector)

  if (!userUid) {
    return ''
  }

  return userUid
}

export default useUserUid
