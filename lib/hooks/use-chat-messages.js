/**
 * @format
 * @flow
 */

import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageSelector } from 'store/selectors'
import { setMessages } from 'store/actions/chats'
import type { BasicMessage } from 'model/types/message'

const useChatMessages = (
  chatUid: string,
  initialValue: BasicMessage[] = [],
): [BasicMessage[], (BasicMessage[]) => void] => {
  const dispatch = useDispatch()

  const chatMessages = useSelector(messageSelector(chatUid)) || initialValue

  const setChatMessages = useCallback(
    (newMessages) => {
      dispatch(
        setMessages({
          chatUid,
          messages: newMessages,
        }),
      )
    },
    [chatUid, dispatch],
  )

  useEffect(() => {
    if (!chatUid) {
      setChatMessages([])
    }
  }, [chatUid, setChatMessages])

  return [chatMessages, setChatMessages]
}

export default useChatMessages
