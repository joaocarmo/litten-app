/**
 * @format
 * @flow
 */

import type {
  BasicAuthUser,
  GenericActionCreator,
  LittenObject,
  FavouriteAction,
} from 'store/types'
import type { BasicUser } from 'model/types/user'
import type { DBCoordinateObject } from 'db/schemas/location'

export const AUTH_USER_CLEAR_BASIC = 'AUTH_USER_CLEAR_BASIC'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'
export const AUTH_USER_SET_DISPLAY_NAME = 'AUTH_USER_SET_DISPLAY_NAME'
export const AUTH_USER_CLEAR_EXTRA = 'AUTH_USER_CLEAR_EXTRA'
export const AUTH_USER_SET_EXTRA = 'AUTH_USER_SET_EXTRA'
export const AUTH_USER_SET_IS_ORGANIZATION = 'AUTH_USER_SET_IS_ORGANIZATION'
export const AUTH_USER_SET_EMAIL = 'AUTH_USER_SET_EMAIL'
export const AUTH_USER_SET_PHONE_NUMBER = 'AUTH_USER_SET_PHONE_NUMBER'
export const AUTH_USER_SET_LOCATION_COORDINATES =
  'AUTH_USER_SET_LOCATION_COORDINATES'
export const AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES =
  'AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES'
export const AUTH_USER_PREFERENCES_SET_METRIC_UNITS =
  'AUTH_USER_PREFERENCES_SET_METRIC_UNITS'
export const AUTH_USER_PREFERENCES_SET_SHARE_METRICS =
  'AUTH_USER_PREFERENCES_SET_SHARE_METRICS'
export const AUTH_USER_SAVED_ACTIVE_POSTS = 'AUTH_USER_SAVED_ACTIVE_POSTS'
export const AUTH_USER_SAVED_PAST_POSTS = 'AUTH_USER_SAVED_PAST_POSTS'
export const AUTH_USER_SAVED_ADD_FAVOURITE = 'AUTH_USER_SAVED_ADD_FAVOURITE'
export const AUTH_USER_SAVED_REMOVE_FAVOURITE =
  'AUTH_USER_SAVED_REMOVE_FAVOURITE'

export function clearBasic(): GenericActionCreator<void> {
  return {
    type: AUTH_USER_CLEAR_BASIC,
  }
}

export function setBasic(basicInfo: BasicAuthUser): GenericActionCreator<any> {
  return {
    type: AUTH_USER_SET_BASIC,
    payload: basicInfo,
  }
}

export function clearExtra(): GenericActionCreator<void> {
  return {
    type: AUTH_USER_CLEAR_EXTRA,
  }
}

export function setExtra(extraInfo: BasicUser): GenericActionCreator<any> {
  return {
    type: AUTH_USER_SET_EXTRA,
    payload: extraInfo,
  }
}

export function setDisplayName(
  displayName: string,
): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SET_DISPLAY_NAME,
    payload: displayName,
  }
}

export function setIsOrganization(
  isOrganization: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_SET_IS_ORGANIZATION,
    payload: isOrganization,
  }
}

export function setEmail(email: string): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SET_EMAIL,
    payload: email,
  }
}

export function setPhoneNumber(
  phoneNumber: string,
): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SET_PHONE_NUMBER,
    payload: phoneNumber,
  }
}

export function setLocationCoordinates(
  coordinates: DBCoordinateObject,
): GenericActionCreator<DBCoordinateObject> {
  return {
    type: AUTH_USER_SET_LOCATION_COORDINATES,
    payload: coordinates,
  }
}

export function setContactPreferences(
  contactPreference: string,
): GenericActionCreator<string> {
  return {
    type: AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES,
    payload: contactPreference,
  }
}

export function setMetricUnits(
  useMetricUnits: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_PREFERENCES_SET_METRIC_UNITS,
    payload: useMetricUnits,
  }
}

export function setShareMetrics(
  shareMetrics: boolean,
): GenericActionCreator<boolean> {
  return {
    type: AUTH_USER_PREFERENCES_SET_SHARE_METRICS,
    payload: shareMetrics,
  }
}

export function setActivePosts(
  activePosts: LittenObject[],
): GenericActionCreator<LittenObject[]> {
  return {
    type: AUTH_USER_SAVED_ACTIVE_POSTS,
    payload: activePosts,
  }
}

export function setPastPosts(
  pastPosts: LittenObject[],
): GenericActionCreator<LittenObject[]> {
  return {
    type: AUTH_USER_SAVED_PAST_POSTS,
    payload: pastPosts,
  }
}

export function addFavourite(litten: LittenObject): FavouriteAction {
  return {
    type: AUTH_USER_SAVED_ADD_FAVOURITE,
    payload: litten,
    index: null,
  }
}

export function removeFavourite(index: number): FavouriteAction {
  return {
    type: AUTH_USER_SAVED_REMOVE_FAVOURITE,
    payload: null,
    index,
  }
}

export const AuthenticatedUserActions = {
  addFavourite,
  clearBasic,
  clearExtra,
  removeFavourite,
  setActivePosts,
  setBasic,
  setContactPreferences,
  setDisplayName,
  setEmail,
  setExtra,
  setIsOrganization,
  setMetricUnits,
  setPastPosts,
  setPhoneNumber,
  setShareMetrics,
}
