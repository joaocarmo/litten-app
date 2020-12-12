/**
 * @format
 * @flow
 */

import type { State } from 'store/types/state'

export const authUserSelector = (state: State) => state.authenticatedUser.basic

export const activeChatsSelector = (state: State) => state.chats.active

export const emailVerifiedSelector = (state: State) =>
  state.authenticatedUser.basic?.emailVerified ?? false

export const messageSelector = (chatUid: string) => (state: State) =>
  state.chats.messages[chatUid]

export const messagesSelector = (state: State) => state.chats.messages

export const userInfoSelector = (state: State) => state.authenticatedUser.extra

export const userUidSelector = (state: State) =>
  state.authenticatedUser.extra.id
