/**
 * @format
 * @flow
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PhotoObject, ProfileForm } from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'

type PayloadAction<P = void, T = string> = {|
  payload: P,
  type: T,
|}

const initialState: ProfileForm = {
  callingCode: null,
  country: null,
  displayName: null,
  email: null,
  isOrganization: null,
  location: null,
  phoneNumber: null,
  photoURL: null,
}

const formProfileSlice: any = createSlice<ProfileForm>({
  name: 'formProfile',
  initialState,
  reducers: {
    clearProfileForm(state: ProfileForm, action: PayloadAction<void>) {
      state.callingCode = initialState.callingCode
      state.country = initialState.country
      state.displayName = initialState.displayName
      state.email = initialState.email
      state.isOrganization = initialState.isOrganization
      state.location = initialState.location
      state.phoneNumber = initialState.phoneNumber
      state.photoURL = initialState.photoURL
    },
    setProfileCallingCode(state: ProfileForm, action: PayloadAction<string>) {
      state.callingCode = action.payload
    },
    setProfileCountry(state: ProfileForm, action: PayloadAction<string>) {
      state.country = action.payload
    },
    setProfileDisplayName(state: ProfileForm, action: PayloadAction<string>) {
      state.displayName = action.payload
    },
    setProfileEmail(state: ProfileForm, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setProfileIsOrganization(
      state: ProfileForm,
      action: PayloadAction<boolean>,
    ) {
      state.isOrganization = action.payload
    },
    setProfileLocation(
      state: ProfileForm,
      action: PayloadAction<DBLocationObject>,
    ) {
      state.location = action.payload
    },
    setProfilePhoneNumber(state: ProfileForm, action: PayloadAction<string>) {
      state.phoneNumber = action.payload
    },
    setProfilePhotoURL(state: ProfileForm, action: PayloadAction<PhotoObject>) {
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
