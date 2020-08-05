/**
 * @format
 * @flow
 */

export const APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN =
  'APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN'

export function toggleAutoRedirectIfLoggedIn(payload: boolean) {
  return {
    type: APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN,
    payload,
  }
}
