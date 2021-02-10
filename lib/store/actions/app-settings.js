/**
 * @format
 * @flow
 */

import type {
  AppSettingsNotifications,
  GenericActionCreator,
} from 'store/types'

export const APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN =
  'APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN'
export const APP_SETTINGS_SET_CURRENTLY_ACTIVE =
  'APP_SETTINGS_SET_CURRENTLY_ACTIVE'
export const APP_SETTINGS_SET_NOTIFICATIONS = 'APP_SETTINGS_SET_NOTIFICATIONS'

export function setAutoRedirectIfLoggedIn(
  payload: boolean,
): GenericActionCreator<boolean> {
  return {
    type: APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN,
    payload,
  }
}

export function setCurrentlyActiveChat(
  payload: string,
): GenericActionCreator<string> {
  return {
    type: APP_SETTINGS_SET_CURRENTLY_ACTIVE,
    payload,
  }
}

export function setNotifications(
  payload: AppSettingsNotifications,
): GenericActionCreator<AppSettingsNotifications> {
  return {
    type: APP_SETTINGS_SET_NOTIFICATIONS,
    payload,
  }
}

export const AppSettingsActions = {
  setAutoRedirectIfLoggedIn,
  setCurrentlyActiveChat,
  setNotifications,
}
