/**
 * @format
 * @flow
 */

import type { GenericActionCreator } from 'store/types'

export const APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN =
  'APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN'

export function setAutoRedirectIfLoggedIn(
  payload: boolean,
): GenericActionCreator<boolean> {
  return {
    type: APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN,
    payload,
  }
}

export const AppSettingsActions = {
  setAutoRedirectIfLoggedIn,
}
