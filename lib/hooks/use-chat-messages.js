/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageSelector } from 'store/selectors'
import { setMessages } from 'store/actions/chats'
import type { BasicMessage } from 'model/types/message'

const useChatMessages = (
  chatUid: string,
  initialValue: BasicMessage[] = [],
): [BasicMessage[], (BasicMessage[]) => void] => {
  const dispatch = useDispatch()

  const chatMessages = useSelector(messageSelector(chatUid))

  const setChatMessages = useCallback(
    (newMessages) =>
      dispatch(
        setMessages({
          chatUid,
          messages: newMessages,
        }),
      ),
    [chatUid, dispatch],
  )

  return [chatMessages, setChatMessages]
}

export default useChatMessages
