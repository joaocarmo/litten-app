/**
 * @format
 * @flow
 */

import type { BasicChat } from 'model/types/chat'
import type { BasicMessage } from 'model/types/message'
import type { GenericActionCreator } from 'store/types'

export const CHATS_SET_ACTIVE = 'CHATS_SET_ACTIVE'
export const CHATS_SET_MESSAGES = 'CHATS_SET_MESSAGES'

export function setChats(
  payload: BasicChat[],
): GenericActionCreator<BasicChat[]> {
  return {
    type: CHATS_SET_ACTIVE,
    payload,
  }
}

export function setMessages(payload: {
  chatUid: string,
  messages: BasicMessage[],
}): GenericActionCreator<{
  chatUid: string,
  messages: BasicMessage[],
}> {
  return {
    type: CHATS_SET_MESSAGES,
    payload,
  }
}

export const ChatsActions = {
  setChats,
  setMessages,
}
