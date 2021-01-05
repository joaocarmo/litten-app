/**
 * @format
 * @flow
 */

import type { BasicChat } from 'model/types/chat'
import type { BasicLitten } from 'model/types/litten'
import type { BasicMessage } from 'model/types/message'
import type { BasicUser } from 'model/types/user'
import type { DBLocationObject } from 'db/schemas/location'

export type GenericActionObject = {
  type: string,
  payload?: any,
}

export type GenericActionCreator<T> = {
  type: string,
  payload?: T,
}

export type ErrorAction = {
  field: string,
  error: Boolean,
  errorMessage: string,
}

export type GenericActionFn<T: any> = (
  type: string,
  payload?: T,
) => GenericActionCreator<T>

export type AppSettings = {
  autoRedirectIfLoggedIn: boolean,
}

export type BasicAuthUser = {|
  +email: string,
  +isAnonymous: Boolean,
  +phoneNumber: string | null,
  +refreshToken: string,
  +displayName: string,
  +emailVerified: boolean,
  +metadata: {
    creationTime: number,
    lastSignInTime: number,
  },
  +photoURL: string,
  +providerData: any[],
  +providerId: string,
  +uid: string,
|}

export type UserPreferences = {
  useMetricUnits: boolean,
  shareMetrics: boolean,
}

export type LittenFeedObject = BasicLitten & {
  distance?: number,
  isFromOrganization?: boolean,
  user?: BasicUser,
  ...
}

export type IndexedAction = {
  index: number | null,
}

export type FavouriteAction = GenericActionCreator<BasicLitten | null> &
  IndexedAction

export type SavedSearch = string

export type SavedFilters = SearchFilters & {
  key: string,
}

export type UserSavedData = {
  activePosts: BasicLitten[],
  favourites: BasicLitten[],
  filters: SavedFilters[],
  pastPosts: BasicLitten[],
  searches: SavedSearch[],
}

export type AuthenticatedUser = {
  basic: BasicAuthUser | null,
  extra: BasicUser,
  preferences: UserPreferences,
  saved: UserSavedData,
}

export type SearchFilters = {
  littenSpecies: string[],
  littenType: string[],
  locationRadius: number,
  userType: string,
}

export type SearchSettings = {
  query: string,
  filters: SearchFilters,
}

export type PhotoObject = string | { uri: string }

export type PhotoAction = GenericActionCreator<PhotoObject | null> &
  IndexedAction

export type LoginForm = {
  email: string,
  password: string,
  error: {
    [key: string]: boolean,
  },
  errorMessage: {
    [key: string]: string,
  },
}

export type RegisterForm = {
  avatar: PhotoObject | null,
  callingCode: string,
  country: string,
  email: string,
  displayName: string,
  password: string,
  passwordConfirm: string,
  phoneNumber: string,
  error: {
    [key: string]: boolean,
  },
  errorMessage: {
    [key: string]: string,
  },
}

export type NewForm = {
  location: DBLocationObject,
  photos: PhotoObject[],
  species: string,
  story: string,
  title: string,
  type: string,
  tags: string[],
  useExtraInfo: boolean,
}

export type ProfileForm = {
  callingCode: string | null,
  country: string | null,
  displayName: string | null,
  email: string | null,
  isOrganization: boolean | null,
  location: DBLocationObject | null,
  phoneNumber: string | null,
  photoURL: PhotoObject | null,
}

export type ReportForm = {
  attachments: PhotoObject[],
  content: string,
  type: string,
}

export type ObjectById<T> = {
  [key: string]: T,
}

export type Chats = {
  active: BasicChat[],
  messages: ObjectById<BasicMessage[]>,
}

export type Cache = {
  feed: LittenFeedObject[],
  littens: ObjectById<BasicLitten>,
  users: ObjectById<BasicUser>,
}
