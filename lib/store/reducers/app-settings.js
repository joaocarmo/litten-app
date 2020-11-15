/**
 * @format
 * @flow
 */

import type { AppSettings, GenericActionObject } from 'store/types'
import {
  APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN,
  APP_SETTINGS_SET_NEW_LOCATION,
} from 'store/actions/app-settings'

export const initialState: AppSettings = {
  autoRedirectIfLoggedIn: true,
  newLocation: null,
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
    case APP_SETTINGS_SET_NEW_LOCATION:
      return {
        ...state,
        newLocation: action.payload,
      }
    default:
      return state
  }
}

export default appSettings
