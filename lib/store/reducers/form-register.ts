import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ErrorAction, PhotoObject, RegisterForm } from 'store/types'

const initialState: RegisterForm = {
  avatar: null,
  callingCode: '',
  country: '',
  email: '',
  displayName: '',
  password: '',
  passwordConfirm: '',
  phoneNumber: '',
  error: {
    avatar: false,
    callingCode: false,
    country: false,
    email: false,
    displayName: false,
    password: false,
    passwordConfirm: false,
    phoneNumber: false,
  },
  errorMessage: {
    avatar: '',
    callingCode: '',
    country: '',
    email: '',
    displayName: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  },
}

const formRegisterSlice = createSlice<RegisterForm>({
  name: 'formRegister',
  initialState,
  reducers: {
    clearErrorsRegisterForm(state) {
      state.error = initialState.error
      state.errorMessage = initialState.errorMessage
    },

    clearRegisterForm(state) {
      state.avatar = null
      state.callingCode = ''
      state.country = ''
      state.email = ''
      state.displayName = ''
      state.password = ''
      state.passwordConfirm = ''
      state.phoneNumber = ''
    },

    setAvatar(state, action: PayloadAction<PhotoObject>) {
      state.avatar = action.payload
    },

    setCallingCode(state, action: PayloadAction<string>) {
      state.callingCode = action.payload
    },

    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload
    },

    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload
    },

    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },

    setErrorAndMessage(state, action: PayloadAction<ErrorAction>) {
      state.error[action.payload.field] = action.payload.error
      state.errorMessage[action.payload.field] = action.payload.errorMessage
    },

    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },

    setPasswordConfirm(state, action: PayloadAction<string>) {
      state.passwordConfirm = action.payload
    },

    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload
    },
  },
})

export const {
  clearErrorsRegisterForm,
  clearRegisterForm,
  setAvatar,
  setCallingCode,
  setCountry,
  setDisplayName,
  setEmail,
  setErrorAndMessage,
  setPassword,
  setPasswordConfirm,
  setPhoneNumber,
} = formRegisterSlice.actions

export default formRegisterSlice.reducer
