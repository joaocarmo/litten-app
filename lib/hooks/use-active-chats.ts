import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeChatsSelector } from '@store/selectors'
import { setChats } from '@store/actions/chats'
import type { BasicChat } from '@model/types/chat'

const areEqual = ([firstLeft], [firstRight]) =>
  firstLeft?.metadata?.updatedAt?.seconds ===
  firstRight?.metadata?.updatedAt?.seconds

const useActiveChats = (): [BasicChat[], (arg0: BasicChat[]) => void] => {
  const dispatch = useDispatch()
  const active = useSelector(activeChatsSelector, areEqual)
  const setNewChats = useCallback(
    (newChats) => {
      dispatch(setChats(newChats))
    },
    [dispatch],
  )
  return [active, setNewChats]
}

export default useActiveChats
