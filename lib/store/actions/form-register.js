/**
 * @format
 * @flow
 */

import type { GenericActionCreator, PhotoObject } from 'store/types'

export const FORM_REGISTER_CLEAR = 'FORM_REGISTER_CLEAR'
export const FORM_REGISTER_CLEAR_ERRORS = 'FORM_REGISTER_CLEAR_ERRORS'
export const FORM_REGISTER_SET_FULL_NAME = 'FORM_REGISTER_SET_FULL_NAME'
export const FORM_REGISTER_SET_EMAIL = 'FORM_REGISTER_SET_EMAIL'
export const FORM_REGISTER_SET_PASSWORD = 'FORM_REGISTER_SET_PASSWORD'
export const FORM_REGISTER_SET_PASSWORD_CONFIRM =
  'FORM_REGISTER_SET_PASSWORD_CONFIRM'
export const FORM_REGISTER_SET_COUNTRY = 'FORM_REGISTER_SET_COUNTRY'
export const FORM_REGISTER_SET_CALLING_CODE = 'FORM_REGISTER_SET_CALLING_CODE'
export const FORM_REGISTER_SET_PHONE_NUMBER = 'FORM_REGISTER_SET_PHONE_NUMBER'
export const FORM_REGISTER_SET_AVATAR = 'FORM_REGISTER_SET_AVATAR'
export const FORM_REGISTER_SET_ERROR_AND_MESSAGE =
  'FORM_REGISTER_SET_ERROR_AND_MESSAGE'

export function clearRegisterForm(): GenericActionCreator<void> {
  return {
    type: FORM_REGISTER_CLEAR,
  }
}

export function clearErrorsRegisterForm(): GenericActionCreator<void> {
  return {
    type: FORM_REGISTER_CLEAR_ERRORS,
  }
}

export function setDisplayName(
  displayName: string,
): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_FULL_NAME,
    payload: displayName,
  }
}

export function setEmail(email: string): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_EMAIL,
    payload: email,
  }
}

export function setPassword(password: string): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_PASSWORD,
    payload: password,
  }
}

export function setPasswordConfirm(
  passwordConfirm: string,
): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_PASSWORD_CONFIRM,
    payload: passwordConfirm,
  }
}

export function setCountry(country: string): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_COUNTRY,
    payload: country,
  }
}

export function setCallingCode(
  callingCode: string,
): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_CALLING_CODE,
    payload: callingCode,
  }
}

export function setPhoneNumber(
  phoneNumber: string,
): GenericActionCreator<string> {
  return {
    type: FORM_REGISTER_SET_PHONE_NUMBER,
    payload: phoneNumber,
  }
}

export function setAvatar(
  avatar: PhotoObject,
): GenericActionCreator<PhotoObject> {
  return {
    type: FORM_REGISTER_SET_AVATAR,
    payload: avatar,
  }
}

export function setErrorAndMessage(
  field: string,
  error: string,
  errorMessage: string,
): GenericActionCreator<{
  field: string,
  error: string,
  errorMessage: string,
}> {
  return {
    type: FORM_REGISTER_SET_ERROR_AND_MESSAGE,
    payload: { field, error, errorMessage },
  }
}

export const FormRegisterActions = {
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
}
