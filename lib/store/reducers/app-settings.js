/**
 * @format
 * @flow
 */

import type { AppSettings, GenericActionObject } from 'store/types'
import { APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN } from 'store/actions/app-settings'

export const initialState: AppSettings = {
  autoRedirectIfLoggedIn: true,
}

function appSettings(
  state: AppSettings = initialState,
  action: GenericActionObject,
) {
  switch (action.type) {
    case APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN:
      return {
        ...state,
        autoRedirectIfLoggedIn: action.payload ?? !state.autoRedirectIfLoggedIn,
      }
    default:
      return state
  }
}

export default appSettings
