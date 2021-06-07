/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { Chats } from 'store/types'
import { CHATS_SET_ACTIVE, CHATS_SET_MESSAGES } from 'store/actions/chats'

export const initialState: Chats = {
  active: [],
  messages: {},
}

const chats: (
  currentState: Chats | void,
  a: void,
  b: void,
  c: void,
  ...extraArgs: Array<any>
) => Chats = produce<Chats>((draft: Chats, action: any) => {
  switch (action.type) {
    case CHATS_SET_ACTIVE:
      draft.active = action.payload
      break
    case CHATS_SET_MESSAGES:
      draft.messages[action.payload.chatUid] = action.payload.messages
      break
    default:
      return draft
  }
}, initialState)

export default chats
