import { State } from '@store/types/state'
import {
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
} from '../types'
import { BasicUser } from '../../model/types/user'
import { BasicMessage } from '../../model/types/message'
import { BasicChat } from '../../model/types/chat'
import { DBCoordinateObject } from '../../db/schemas/location'

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
): DBCoordinateObject | null =>
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
export const searchHistorySelector = (state: State): SavedSearch[] =>
  state.authenticatedUser.saved.searches
