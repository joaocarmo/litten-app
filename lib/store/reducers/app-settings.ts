/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppSettingsNotifications } from '@store/types'

const initialState = {
  autoRedirectIfLoggedIn: true,
  currentlyActiveChat: '',
  notifications: {
    lastCheckAt: 0,
    unreadChatsNum: 0,
  },
}

const appSettingsSlice = createSlice({
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

    reset() {
      return { ...initialState }
    },
  },
})

export const {
  setAutoRedirectIfLoggedIn,
  setCurrentlyActiveChat,
  setNotifications,
  reset,
} = appSettingsSlice.actions

export default appSettingsSlice.reducer
