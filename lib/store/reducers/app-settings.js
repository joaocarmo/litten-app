/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { AppSettings } from 'store/types'
import {
  APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN,
  APP_SETTINGS_SET_CURRENTLY_ACTIVE,
  APP_SETTINGS_SET_NOTIFICATIONS,
} from 'store/actions/app-settings'

export const initialState: AppSettings = {
  autoRedirectIfLoggedIn: true,
  currentlyActiveChat: '',
  notifications: {
    lastCheckAt: 0,
    unreadChatsNum: 0,
  },
}

const appSettings: (currentState: AppSettings) => AppSettings =
  produce<AppSettings>((draft: AppSettings, action: any) => {
    switch (action.type) {
      case APP_SETTINGS_SET_AUTO_REDIRECT_IF_LOGGED_IN:
        draft.autoRedirectIfLoggedIn = action.payload
        break
      case APP_SETTINGS_SET_CURRENTLY_ACTIVE:
        draft.currentlyActiveChat = action.payload
        break
      case APP_SETTINGS_SET_NOTIFICATIONS:
        draft.notifications = action.payload
        break
      default:
        return draft
    }
  }, initialState)

export default appSettings
