/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentlyActiveChatSelector } from 'store/selectors'
import { setCurrentlyActiveChat } from 'store/actions/app-settings'

const useCurrentlyActiveChat = (): [string, (chatUid: string) => void] => {
  const dispatch = useDispatch()

  const currentlyActiveChat = useSelector(currentlyActiveChatSelector)

  const setNewCurrentlyActiveChat = useCallback(
    (newChatUid) => {
      dispatch(setCurrentlyActiveChat(newChatUid ?? ''))
    },
    [dispatch],
  )

  return [currentlyActiveChat, setNewCurrentlyActiveChat]
}

export default useCurrentlyActiveChat
