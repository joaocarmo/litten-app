/**
 * @format
 * @flow
 */

import { createSlice } from '@reduxjs/toolkit'
import type { ErrorAction, LoginForm } from 'store/types'

type PayloadAction<P = void, T = string> = {|
  payload: P,
  type: T,
|}

const initialState: LoginForm = {
  email: '',
  password: '',
  error: {
    email: false,
    password: false,
  },
  errorMessage: {
    email: '',
    password: '',
  },
}

const formLoginSlice: any = createSlice<LoginForm>({
  name: 'formLogin',
  initialState,
  reducers: {
    clearErrorsLoginForm: (state: LoginForm, action: PayloadAction<void>) => {
      state.error = {
        email: false,
        password: false,
      }
      state.errorMessage = {
        email: '',
        password: '',
      }
    },
    clearLoginForm(state: LoginForm, action: PayloadAction<void>) {
      state.email = ''
      state.password = ''
    },
    setEmail(state: LoginForm, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setErrorAndMessage(state: LoginForm, action: PayloadAction<ErrorAction>) {
      state.error[action.payload.field] = action.payload.error
      state.errorMessage[action.payload.field] = action.payload.errorMessage
    },
    setPassword(state: LoginForm, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
})

export const {
  clearErrorsLoginForm,
  clearLoginForm,
  setEmail,
  setErrorAndMessage,
  setPassword,
} = formLoginSlice.actions

export default formLoginSlice.reducer
