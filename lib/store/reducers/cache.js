/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { Cache } from 'store/types'
import { CACHE_SET_LITTENS, CACHE_SET_USERS } from 'store/actions/cache'

export const initialState: Cache = {
  littens: {},
  users: {},
}

const cache = produce<Cache>((draft: Cache, action: any) => {
  switch (action.type) {
    case CACHE_SET_LITTENS:
      draft.littens = action.payload
      break
    case CACHE_SET_USERS:
      draft.users = action.payload
      break
    default:
      return draft
  }
}, initialState)

export default cache
