/**
 * @format
 * @flow
 */

import type { State } from 'store/types/state'

export const activeChatsSelector = (state: State) => state.chats.active

export const userUidSelector = (state: State) =>
  state.authenticatedUser.extra.id
