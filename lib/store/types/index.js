/**
 * @format
 * @flow
 */

import type { DBUserObject } from 'db/schemas/user'

export type GenericActionObject = {
  type: string,
  payload?: any,
}

export type GenericActionCreator<T> = {
  type: string,
  payload?: T,
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
  distanceUnit: string,
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
