/**
 * @format
 * @flow
 */

import type { DBUserObject } from 'db/schemas/user'
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

export type GenericActionFn = (type: string, payload?: any) => void

export type AppSettings = {
  autoRedirectIfLoggedIn?: boolean,
}

export type BasicAuthUser = {
  phoneNumber?: string | null,
  isAnonymous?: Boolean,
  email?: string,
  refreshToken?: string,
  metadata?: {
    creationTime?: number,
    lastSignInTime?: number,
  },
  uid?: string,
  photoURL?: string,
  providerId?: string,
  emailVerified?: boolean,
  providerData?: Array<any>,
  displayName?: string,
}

export type UserPreferences = {
  useMetricUnits: boolean,
  shareMetrics: boolean,
}

export type AuthenticatedUser = {
  basic: BasicAuthUser | null,
  extra: DBUserObject,
  preferences: UserPreferences,
}

export type SearchSettings = {
  filters: {
    littenSpecies: string[],
    littenType: string[],
    locationRadius: number,
  },
}

export type PhotoObject = string | { uri: string }

export type PhotoAction = GenericActionCreator<PhotoObject | null> & {
  index: number | null,
}

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
  useExtraInfo: boolean,
}
