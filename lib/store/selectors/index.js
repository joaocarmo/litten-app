/**
 * @format
 * @flow
 */

import type {
  AppSettings,
  AppSettingsNotifications,
  BasicAuthUser,
  Chats,
  LittenFeedObject,
  ObjectById,
  SavedSearch,
  SearchFilters,
  UserPreferences,
  UserSavedData,
} from '../types/index'
import type { BasicUser } from '../../model/types/user'
import type { BasicMessage } from '../../model/types/message'
import type { BasicLitten } from '../../model/types/litten'
import type { BasicChat } from '../../model/types/chat'
import type { DBCoordinateObject } from '../../db/schemas/location'
import type { State } from 'store/types/state'

export const appSettingsSelector = (state: State): AppSettings =>
  state.appSettings

export const appSettingsNotificationsSelector = (
  state: State,
): AppSettingsNotifications => state.appSettings.notifications

export const authUserSelector = (state: State): null | BasicAuthUser =>
  state.authenticatedUser.basic

export const activeChatsSelector = (state: State): Array<BasicChat> =>
  state.chats.active

export const cacheFeedSelector = (state: State): Array<LittenFeedObject> =>
  state.cache.feed

export const cacheLittenSelector = (state: State): ObjectById<BasicLitten> =>
  state.cache.littens

export const cacheUserSelector = (state: State): ObjectById<BasicUser> =>
  state.cache.users

export const chatSelector = (state: State): Chats => state.chats

export const currentlyActiveChatSelector = (state: State): string =>
  state.appSettings.currentlyActiveChat

export const emailVerifiedSelector = (state: State): boolean =>
  state.authenticatedUser.basic?.emailVerified ?? false

export const messageSelector =
  (chatUid: string): ((state: State) => Array<BasicMessage>) =>
  (state: State) =>
    state.chats.messages[chatUid]

export const messagesSelector = (
  state: State,
): ObjectById<Array<BasicMessage>> => state.chats.messages

export const userCoordinatesSelector = (
  state: State,
): void | DBCoordinateObject =>
  state.authenticatedUser.extra.location?.coordinates

export const userPreferencesSelector = (state: State): UserPreferences =>
  state.authenticatedUser.preferences

export const userInfoSelector = (state: State): BasicUser =>
  state.authenticatedUser.extra

export const userSavedSelector = (state: State): UserSavedData =>
  state.authenticatedUser.saved

export const userUidSelector = (state: State): void | string =>
  state.authenticatedUser.extra.id

export const searchFiltersSelector = (state: State): SearchFilters =>
  state.searchSettings.filters

export const searchQuerySelector = (state: State): string =>
  state.searchSettings.query

export const searchHistorySelector = (state: State): Array<SavedSearch> =>
  state.authenticatedUser.saved.searches
