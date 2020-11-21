/**
 * @format
 * @flow
 */

import type { DBLocationObject } from 'db/schemas/location'
import type { GenericActionCreator, PhotoObject } from 'store/types'

export const FORM_PROFILE_CLEAR = 'FORM_PROFILE_CLEAR'
export const FORM_PROFILE_SET_CALLING_CODE = 'FORM_PROFILE_SET_CALLING_CODE'
export const FORM_PROFILE_SET_COUNTRY = 'FORM_PROFILE_SET_COUNTRY'
export const FORM_PROFILE_SET_DISPLAY_NAME = 'FORM_PROFILE_SET_DISPLAY_NAME'
export const FORM_PROFILE_SET_EMAIL = 'FORM_PROFILE_SET_EMAIL'
export const FORM_PROFILE_SET_IS_ORGANIZATION =
  'FORM_PROFILE_SET_IS_ORGANIZATION'
export const FORM_PROFILE_SET_LOCATION = 'FORM_PROFILE_SET_LOCATION'
export const FORM_PROFILE_SET_PHONE_NUMBER = 'FORM_PROFILE_SET_PHONE_NUMBER'
export const FORM_PROFILE_SET_PHOTO_URL = 'FORM_PROFILE_SET_PHOTO_URL'

export function clearProfileForm(): GenericActionCreator<void> {
  return {
    type: FORM_PROFILE_CLEAR,
  }
}

export function setProfileCallingCode(
  callingCode: string,
): GenericActionCreator<string> {
  return {
    type: FORM_PROFILE_SET_CALLING_CODE,
    payload: callingCode,
  }
}

export function setProfileCountry(
  country: string,
): GenericActionCreator<string> {
  return {
    type: FORM_PROFILE_SET_COUNTRY,
    payload: country,
  }
}

export function setProfileDisplayName(
  displayName: string,
): GenericActionCreator<string> {
  return {
    type: FORM_PROFILE_SET_DISPLAY_NAME,
    payload: displayName,
  }
}

export function setProfileEmail(email: string): GenericActionCreator<string> {
  return {
    type: FORM_PROFILE_SET_EMAIL,
    payload: email,
  }
}

export function setProfileIsOrganization(
  isOrganization: boolean,
): GenericActionCreator<boolean> {
  return {
    type: FORM_PROFILE_SET_IS_ORGANIZATION,
    payload: isOrganization,
  }
}

export function setProfileLocation(
  location: DBLocationObject,
): GenericActionCreator<DBLocationObject> {
  return {
    type: FORM_PROFILE_SET_LOCATION,
    payload: location,
  }
}

export function setProfilePhoneNumber(
  phoneNumber: string,
): GenericActionCreator<string> {
  return {
    type: FORM_PROFILE_SET_PHONE_NUMBER,
    payload: phoneNumber,
  }
}

export function setProfilePhotoURL(
  photoURL: PhotoObject,
): GenericActionCreator<PhotoObject> {
  return {
    type: FORM_PROFILE_SET_PHOTO_URL,
    payload: photoURL,
  }
}

export const FormProfileActions = {
  clearProfileForm,
  setProfileCallingCode,
  setProfileCountry,
  setProfileDisplayName,
  setProfileEmail,
  setProfileIsOrganization,
  setProfileLocation,
  setProfilePhoneNumber,
  setProfilePhotoURL,
}
