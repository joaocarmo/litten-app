/**
 * @format
 * @flow
 */

import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type {
  GenericActionCreator,
  LittenFeedObject,
  ObjectById,
} from 'store/types'

export const CACHE_ADD_LITTENS = 'CACHE_ADD_LITTENS'
export const CACHE_ADD_USERS = 'CACHE_ADD_USERS'
export const CACHE_SET_FEED = 'CACHE_SET_FEED'
export const CACHE_SET_LITTENS = 'CACHE_SET_LITTENS'
export const CACHE_SET_USERS = 'CACHE_SET_USERS'

export function addLitten(
  payload: BasicLitten,
): GenericActionCreator<BasicLitten> {
  return {
    type: CACHE_ADD_LITTENS,
    payload,
  }
}

export function addUser(payload: BasicUser): GenericActionCreator<BasicUser> {
  return {
    type: CACHE_ADD_USERS,
    payload,
  }
}

export function setFeed(
  payload: LittenFeedObject[],
): GenericActionCreator<LittenFeedObject[]> {
  return {
    type: CACHE_SET_FEED,
    payload,
  }
}

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
  addLitten,
  addUser,
  setFeed,
  setLittens,
  setUsers,
}
