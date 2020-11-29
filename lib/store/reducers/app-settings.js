/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { AppSettings } from 'store/types'
import { APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN } from 'store/actions/app-settings'

export const initialState: AppSettings = {
  autoRedirectIfLoggedIn: true,
}

const appSettings = produce<AppSettings>((draft: AppSettings, action: any) => {
  switch (action.type) {
    case APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN:
      draft.autoRedirectIfLoggedIn = action.payload
      break
    default:
      return initialState
  }
}, initialState)

export default appSettings
