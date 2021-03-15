/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { Cache } from 'store/types'
import {
  CACHE_ADD_LITTENS,
  CACHE_ADD_USERS,
  CACHE_SET_FEED,
  CACHE_SET_LITTENS,
  CACHE_SET_USERS,
} from 'store/actions/cache'

export const initialState: Cache = {
  feed: [],
  littens: {},
  users: {},
}

const cache: (
  currentState: Cache | void,
  a: void,
  b: void,
  c: void,
  ...extraArgs: Array<any>
) => Cache = produce<Cache>((draft: Cache, action: any) => {
  switch (action.type) {
    case CACHE_SET_LITTENS:
      draft.littens = action.payload
      break
    case CACHE_SET_USERS:
      draft.users = action.payload
      break
    case CACHE_SET_FEED:
      draft.feed = action.payload
      break
    case CACHE_ADD_LITTENS:
      draft.littens[action.payload.id] = action.payload
      break
    case CACHE_ADD_USERS:
      draft.users[action.payload.id] = action.payload
      break
    default:
      return draft
  }
}, initialState)

export default cache
