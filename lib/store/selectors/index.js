/**
 * @format
 * @flow
 */

import type { State } from 'store/types/state'

export const activeChatsSelector = (state: State) => state.chats.active

export const messageSelector = (chatUid: string) => (state: State) =>
  state.chats.messages[chatUid]

export const messagesSelector = (state: State) => state.chats.messages

export const userUidSelector = (state: State) =>
  state.authenticatedUser.extra.id
