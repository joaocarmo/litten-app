import { BasicChat } from '@model/types/chat'
import { BasicLitten } from '@model/types/litten'
import { BasicMessage } from '@model/types/message'
import { BasicUser } from '@model/types/user'
import { DBLocationObject } from '@db/schemas/location'

export type GenericActionObject = {
  type: string
  payload?: unknown
}
export type GenericActionCreator<T> = {
  type: string
  payload?: T
}
export type ErrorAction = {
  error: boolean
  errorMessage: string
  field: string
}
export type GenericActionFn<T> = (
  type: string,
  payload?: T,
) => GenericActionCreator<T>
export type AppSettingsNotifications = {
  lastCheckAt: number
  unreadChatsNum: number
}
export type AppSettings = {
  autoRedirectIfLoggedIn: boolean
  currentlyActiveChat: string
  notifications: AppSettingsNotifications
}
export type BasicAuthUser = {
  readonly email: string
  readonly isAnonymous: boolean
  readonly phoneNumber: string | null
  readonly refreshToken: string
  readonly displayName: string
  readonly emailVerified: boolean
  readonly metadata: {
    creationTime: number
    lastSignInTime: number
  }
  readonly photoURL: string
  readonly providerData: unknown[]
  readonly providerId: string
  readonly uid: string
}
export type ThemePreferences = 'dark' | 'light' | 'system'
export type UserPreferences = {
  theme: ThemePreferences
  useMetricUnits: boolean
  shareMetrics: boolean
}
export type LittenFeedObject = BasicLitten & {
  distance?: number
  isFromOrganization?: boolean
  user?: BasicUser
}
export type IndexedAction = {
  index: number | null
}
export type FavouriteAction = GenericActionCreator<BasicLitten | null> &
  IndexedAction
export type SavedSearch = string
export type SavedFilters = SearchFilters & {
  key: string
}
export type UserSavedData = {
  activePosts: BasicLitten[]
  favourites: BasicLitten[]
  filters: SavedFilters[]
  pastPosts: BasicLitten[]
  searches: SavedSearch[]
}
export type AuthenticatedUser = {
  basic: BasicAuthUser | null
  extra: BasicUser
  preferences: UserPreferences
  saved: UserSavedData
}
export type SearchFilters = {
  littenSpecies: string[]
  littenType: string[]
  locationRadius: number
  userType: string
}
export type SearchSettings = {
  query: string
  filters: SearchFilters
}
export type PhotoObject =
  | string
  | {
      uri: string
    }
export type PhotoAction = GenericActionCreator<PhotoObject | null> &
  IndexedAction
export type LoginForm = {
  email: string
  password: string
  error: Record<string, boolean>
  errorMessage: Record<string, string>
}
export type RegisterForm = {
  avatar: PhotoObject | null
  callingCode: string
  country: string
  email: string
  displayName: string
  password: string
  passwordConfirm: string
  phoneNumber: string
  error: Record<string, boolean>
  errorMessage: Record<string, string>
}
export type NewForm = {
  location: DBLocationObject
  photos: PhotoObject[]
  species: string
  story: string
  title: string
  type: string
  tags: string[]
  useExtraInfo: boolean
}
export type ProfileForm = {
  callingCode: string | null
  country: string | null
  displayName: string | null
  email: string | null
  isOrganization: boolean | null
  location: DBLocationObject | null
  phoneNumber: string | null
  photoURL: PhotoObject | null
}
export type ReportForm = {
  attachments: PhotoObject[]
  content: string
  type: string
}
export type ObjectById<T> = Record<string, T>
export type Chats = {
  active: BasicChat[]
  messages: ObjectById<BasicMessage[]>
}
export type Cache = {
  feed: LittenFeedObject[]
  littens: ObjectById<BasicLitten>
  users: ObjectById<BasicUser>
}
