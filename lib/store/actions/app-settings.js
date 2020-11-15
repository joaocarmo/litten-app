/**
 * @format
 * @flow
 */

import type { GenericActionCreator } from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'

export const APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN =
  'APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN'
export const APP_SETTINGS_SET_NEW_LOCATION = 'APP_SETTINGS_SET_NEW_LOCATION'

export function setNewLocation(
  payload: DBLocationObject,
): GenericActionCreator<DBLocationObject> {
  return {
    type: APP_SETTINGS_SET_NEW_LOCATION,
    payload,
  }
}

export function toggleAutoRedirectIfLoggedIn(
  payload: boolean,
): GenericActionCreator<boolean> {
  return {
    type: APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN,
    payload,
  }
}

export const AppSettingsActions = {
  setNewLocation,
  toggleAutoRedirectIfLoggedIn,
}
