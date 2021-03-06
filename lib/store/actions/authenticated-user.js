/**
 * @format
 * @flow
 */

import type {
  BasicAuthUser,
  FavouriteAction,
  GenericActionCreator,
  SearchFilters,
} from 'store/types'
import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type { DBCoordinateObject, DBLocationObject } from 'db/schemas/location'

export const AUTH_USER_CLEAR_BASIC = 'AUTH_USER_CLEAR_BASIC'
export const AUTH_USER_CLEAR_EXTRA = 'AUTH_USER_CLEAR_EXTRA'
export const AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES =
  'AUTH_USER_PREFERENCES_SET_CONTACT_PREFERENCES'
export const AUTH_USER_PREFERENCES_SET_METRIC_UNITS =
  'AUTH_USER_PREFERENCES_SET_METRIC_UNITS'
export const AUTH_USER_PREFERENCES_SET_SHARE_METRICS =
  'AUTH_USER_PREFERENCES_SET_SHARE_METRICS'
export const AUTH_USER_SAVED_ACTIVE_POSTS = 'AUTH_USER_SAVED_ACTIVE_POSTS'
export const AUTH_USER_SAVED_ADD_FAVOURITE_FILTER =
  'AUTH_USER_SAVED_ADD_FAVOURITE_FILTER'
export const AUTH_USER_SAVED_ADD_FAVOURITE = 'AUTH_USER_SAVED_ADD_FAVOURITE'
export const AUTH_USER_SAVED_PAST_POSTS = 'AUTH_USER_SAVED_PAST_POSTS'
export const AUTH_USER_SAVED_REMOVE_FAVOURITE_FILTER =
  'AUTH_USER_SAVED_REMOVE_FAVOURITE_FILTER'
export const AUTH_USER_SAVED_REMOVE_FAVOURITE =
  'AUTH_USER_SAVED_REMOVE_FAVOURITE'
export const AUTH_USER_SAVED_SEARCHES_ADD = 'AUTH_USER_SAVED_SEARCHES_ADD'
export const AUTH_USER_SAVED_SEARCHES_CLEAR = 'AUTH_USER_SAVED_SEARCHES_CLEAR'
export const AUTH_USER_SAVED_SEARCHES_REMOVE = 'AUTH_USER_SAVED_SEARCHES_REMOVE'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'
export const AUTH_USER_SET_DISPLAY_NAME = 'AUTH_USER_SET_DISPLAY_NAME'
export const AUTH_USER_SET_EMAIL = 'AUTH_USER_SET_EMAIL'
export const AUTH_USER_SET_EXTRA = 'AUTH_USER_SET_EXTRA'
export const AUTH_USER_SET_IS_ORGANIZATION = 'AUTH_USER_SET_IS_ORGANIZATION'
export const AUTH_USER_SET_LOCATION = 'AUTH_USER_SET_LOCATION'
export const AUTH_USER_SET_LOCATION_COORDINATES =
  'AUTH_USER_SET_LOCATION_COORDINATES'
export const AUTH_USER_SET_PHONE_NUMBER = 'AUTH_USER_SET_PHONE_NUMBER'
export const AUTH_USER_SET_PHOTO_URL = 'AUTH_USER_SET_PHOTO_URL'

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

export function setPhotoURL(photoURL: string): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SET_PHOTO_URL,
    payload: photoURL,
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

export function setLocation(
  location: DBLocationObject,
): GenericActionCreator<DBLocationObject> {
  return {
    type: AUTH_USER_SET_LOCATION,
    payload: location,
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
  activePosts: BasicLitten[],
): GenericActionCreator<BasicLitten[]> {
  return {
    type: AUTH_USER_SAVED_ACTIVE_POSTS,
    payload: activePosts,
  }
}

export function setPastPosts(
  pastPosts: BasicLitten[],
): GenericActionCreator<BasicLitten[]> {
  return {
    type: AUTH_USER_SAVED_PAST_POSTS,
    payload: pastPosts,
  }
}

export function addFavourite(litten: BasicLitten): FavouriteAction {
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

export function removeFavouriteLitten(litten: BasicLitten): FavouriteAction {
  return {
    type: AUTH_USER_SAVED_REMOVE_FAVOURITE,
    payload: litten,
    index: null,
  }
}

export function addFavouriteFilter(
  filter: SearchFilters,
): GenericActionCreator<SearchFilters> {
  return {
    type: AUTH_USER_SAVED_ADD_FAVOURITE_FILTER,
    payload: filter,
  }
}

export function removeFavouriteFilter(
  name: string,
): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SAVED_REMOVE_FAVOURITE_FILTER,
    payload: name,
  }
}

export function addSavedSearch(query: string): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SAVED_SEARCHES_ADD,
    payload: query,
  }
}

export function clearSavedSearch(): GenericActionCreator<void> {
  return {
    type: AUTH_USER_SAVED_SEARCHES_CLEAR,
  }
}

export function removeSavedSearch(query: string): GenericActionCreator<string> {
  return {
    type: AUTH_USER_SAVED_SEARCHES_REMOVE,
    payload: query,
  }
}

export const AuthenticatedUserActions = {
  addFavourite,
  addFavouriteFilter,
  addSavedSearch,
  clearBasic,
  clearExtra,
  clearSavedSearch,
  removeFavourite,
  removeFavouriteFilter,
  removeFavouriteLitten,
  removeSavedSearch,
  setActivePosts,
  setBasic,
  setContactPreferences,
  setDisplayName,
  setEmail,
  setExtra,
  setIsOrganization,
  setLocation,
  setLocationCoordinates,
  setMetricUnits,
  setPastPosts,
  setPhoneNumber,
  setPhotoURL,
  setShareMetrics,
}
