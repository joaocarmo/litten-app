/**
 * @format
 * @flow
 */

import type { State } from 'store/types/state'

export const authUserSelector = (state: State) => state.authenticatedUser.basic

export const activeChatsSelector = (state: State) => state.chats.active

export const cacheSelector = (state: State) => state.cache

export const emailVerifiedSelector = (state: State) =>
  state.authenticatedUser.basic?.emailVerified ?? false

export const messageSelector = (chatUid: string) => (state: State) =>
  state.chats.messages[chatUid]

export const messagesSelector = (state: State) => state.chats.messages

export const userCoordinatesSelector = (state: State) =>
  state.authenticatedUser.extra.location?.coordinates

export const userPreferencesSelector = (state: State) =>
  state.authenticatedUser.preferences

export const userInfoSelector = (state: State) => state.authenticatedUser.extra

export const userSavedSelector = (state: State) => state.authenticatedUser.saved

export const userUidSelector = (state: State) =>
  state.authenticatedUser.extra.id

export const searchQuerySelector = (state: State) => state.searchSettings.query

export const searchHistorySelector = (state: State) =>
  state.authenticatedUser.saved.searches
