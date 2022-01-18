/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { PhotoObject } from '@store/types'
import type { DBLocationObject } from '@db/schemas/location'

const initialState = {
  callingCode: null,
  country: null,
  displayName: null,
  email: null,
  isOrganization: null,
  location: null,
  phoneNumber: null,
  photoURL: null,
}

const formProfileSlice = createSlice({
  name: 'formProfile',
  initialState,
  reducers: {
    clearProfileForm(state) {
      state.callingCode = initialState.callingCode
      state.country = initialState.country
      state.displayName = initialState.displayName
      state.email = initialState.email
      state.isOrganization = initialState.isOrganization
      state.location = initialState.location
      state.phoneNumber = initialState.phoneNumber
      state.photoURL = initialState.photoURL
    },

    setProfileCallingCode(state, action: PayloadAction<string>) {
      state.callingCode = action.payload
    },

    setProfileCountry(state, action: PayloadAction<string>) {
      state.country = action.payload
    },

    setProfileDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload
    },

    setProfileEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },

    setProfileIsOrganization(state, action: PayloadAction<boolean>) {
      state.isOrganization = action.payload
    },

    setProfileLocation(state, action: PayloadAction<DBLocationObject>) {
      state.location = action.payload
    },

    setProfilePhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload
    },

    setProfilePhotoURL(state, action: PayloadAction<PhotoObject>) {
      state.photoURL = action.payload
    },
  },
})

export const {
  clearProfileForm,
  setProfileCallingCode,
  setProfileCountry,
  setProfileDisplayName,
  setProfileEmail,
  setProfileIsOrganization,
  setProfileLocation,
  setProfilePhoneNumber,
  setProfilePhotoURL,
} = formProfileSlice.actions

export default formProfileSlice.reducer
