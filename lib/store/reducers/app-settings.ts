import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppSettings, AppSettingsNotifications } from 'store/types'

const initialState: AppSettings = {
  autoRedirectIfLoggedIn: true,
  currentlyActiveChat: '',
  notifications: {
    lastCheckAt: 0,
    unreadChatsNum: 0,
  },
}

const appSettingsSlice = createSlice<AppSettings>({
  name: 'appSettings',
  initialState,
  reducers: {
    setAutoRedirectIfLoggedIn(state, action: PayloadAction<boolean>) {
      state.autoRedirectIfLoggedIn = action.payload
    },

    setCurrentlyActiveChat(state, action: PayloadAction<string>) {
      state.currentlyActiveChat = action.payload
    },

    setNotifications(state, action: PayloadAction<AppSettingsNotifications>) {
      state.notifications = action.payload
    },
  },
})

export const {
  setAutoRedirectIfLoggedIn,
  setCurrentlyActiveChat,
  setNotifications,
} = appSettingsSlice.actions

export default appSettingsSlice.reducer
