/**
 * @format
 * @flow
 */

import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type { GenericActionCreator, ObjectById } from 'store/types'

export const CACHE_SET_LITTENS = 'CACHE_SET_LITTENS'
export const CACHE_SET_USERS = 'CACHE_SET_USERS'

export function setLittens(
  payload: ObjectById<BasicLitten>,
): GenericActionCreator<ObjectById<BasicLitten>> {
  return {
    type: CACHE_SET_LITTENS,
    payload,
  }
}

export function setUsers(
  payload: ObjectById<BasicUser>,
): GenericActionCreator<ObjectById<BasicUser>> {
  return {
    type: CACHE_SET_USERS,
    payload,
  }
}

export const CacheActions = {
  setLittens,
  setUsers,
}
