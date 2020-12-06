/**
 * @format
 * @flow
 */

import type { BasicChat } from 'model/types/chat'
import type { BasicLitten } from 'model/types/litten'
import type { BasicMessage } from 'model/types/message'
import type { BasicUser } from 'model/types/user'
import type { GenericActionCreator, ObjectById } from 'store/types'

export const CHATS_SET_ACTIVE = 'CHATS_SET_ACTIVE'
export const CHATS_SET_LITTENS = 'CHATS_SET_LITTENS'
export const CHATS_SET_MESSAGES = 'CHATS_SET_MESSAGES'
export const CHATS_SET_USERS = 'CHATS_SET_USERS'

export function setChats(
  payload: BasicChat[],
): GenericActionCreator<BasicChat[]> {
  return {
    type: CHATS_SET_ACTIVE,
    payload,
  }
}

export function setLittens(
  payload: ObjectById<BasicLitten>,
): GenericActionCreator<ObjectById<BasicLitten>> {
  return {
    type: CHATS_SET_LITTENS,
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

export function setUsers(
  payload: ObjectById<BasicUser>,
): GenericActionCreator<ObjectById<BasicUser>> {
  return {
    type: CHATS_SET_USERS,
    payload,
  }
}

export const ChatsActions = {
  setChats,
  setLittens,
  setMessages,
  setUsers,
}
