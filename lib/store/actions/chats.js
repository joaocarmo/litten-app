/**
 * @format
 * @flow
 */

import type { BasicChat } from 'model/types/chat'
import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type { GenericActionCreator, ObjectById } from 'store/types'

export const CHATS_SET_ACTIVE = 'CHATS_SET_ACTIVE'
export const CHATS_SET_LITTENS = 'CHATS_SET_LITTENS'
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
  setUsers,
}
