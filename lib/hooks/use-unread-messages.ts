import { useSelector } from 'react-redux'
import { activeChatsSelector } from '@store/selectors'
import useUserUid from '@hooks/use-useruid'

const useUnreadMessages = (): number => {
  const activeChats = useSelector(activeChatsSelector)
  const userUid = useUserUid()

  if (Array.isArray(activeChats)) {
    return activeChats.reduce(
      (acc, { read = [] }) => (read.includes(userUid) ? acc : acc + 1),
      0,
    )
  }

  return 0
}

export default useUnreadMessages
