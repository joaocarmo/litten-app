/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { Chats } from 'store/types'
import {
  CHATS_SET_ACTIVE,
  CHATS_SET_LITTENS,
  CHATS_SET_USERS,
} from 'store/actions/chats'

export const initialState: Chats = {
  active: [],
  littens: {},
  users: {},
}

const chats = produce<Chats>((draft: Chats, action: any) => {
  switch (action.type) {
    case CHATS_SET_ACTIVE:
      draft.active = action.payload
      break
    case CHATS_SET_LITTENS:
      draft.littens = action.payload
      break
    case CHATS_SET_USERS:
      draft.users = action.payload
      break
    default:
      return initialState
  }
}, initialState)

export default chats
