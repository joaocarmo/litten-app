/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { ProfileForm } from 'store/types'
import {
  FORM_PROFILE_CLEAR,
  FORM_PROFILE_SET_CALLING_CODE,
  FORM_PROFILE_SET_COUNTRY,
  FORM_PROFILE_SET_DISPLAY_NAME,
  FORM_PROFILE_SET_EMAIL,
  FORM_PROFILE_SET_IS_ORGANIZATION,
  FORM_PROFILE_SET_LOCATION,
  FORM_PROFILE_SET_PHONE_NUMBER,
  FORM_PROFILE_SET_PHOTO_URL,
} from 'store/actions/form-profile'

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

const formProfile = produce<ProfileForm>((draft: ProfileForm, action: any) => {
  switch (action.type) {
    case FORM_PROFILE_CLEAR:
      return initialState
    case FORM_PROFILE_SET_CALLING_CODE:
      draft.callingCode = action.payload
      break
    case FORM_PROFILE_SET_COUNTRY:
      draft.country = action.payload
      break
    case FORM_PROFILE_SET_DISPLAY_NAME:
      draft.displayName = action.payload
      break
    case FORM_PROFILE_SET_EMAIL:
      draft.email = action.payload
      break
    case FORM_PROFILE_SET_IS_ORGANIZATION:
      draft.isOrganization = action.payload
      break
    case FORM_PROFILE_SET_LOCATION:
      draft.location = action.payload
      break
    case FORM_PROFILE_SET_PHONE_NUMBER:
      draft.phoneNumber = action.payload
      break
    case FORM_PROFILE_SET_PHOTO_URL:
      draft.photoURL = action.payload
      break
    default:
      return draft
  }
}, initialState)

export default formProfile
