/**
 * @format
 * @flow
 */

import type { GenericActionCreator } from 'store/types'

export const FORM_LOGIN_CLEAR = 'FORM_LOGIN_CLEAR'
export const FORM_LOGIN_CLEAR_ERRORS = 'FORM_LOGIN_CLEAR_ERRORS'
export const FORM_LOGIN_SET_EMAIL = 'FORM_LOGIN_SET_EMAIL'
export const FORM_LOGIN_SET_PASSWORD = 'FORM_LOGIN_SET_PASSWORD'
export const FORM_LOGIN_SET_ERROR_AND_MESSAGE =
  'FORM_LOGIN_SET_ERROR_AND_MESSAGE'

export function clearLoginForm(): GenericActionCreator<void> {
  return {
    type: FORM_LOGIN_CLEAR,
  }
}

export function clearErrorsLoginForm(): GenericActionCreator<void> {
  return {
    type: FORM_LOGIN_CLEAR_ERRORS,
  }
}

export function setEmail(email: string): GenericActionCreator<string> {
  return {
    type: FORM_LOGIN_SET_EMAIL,
    payload: email,
  }
}

export function setPassword(password: string): GenericActionCreator<string> {
  return {
    type: FORM_LOGIN_SET_PASSWORD,
    payload: password,
  }
}

export function setErrorAndMessage(
  field: string,
  error: string,
  errorMessage: string,
): GenericActionCreator<any> {
  return {
    type: FORM_LOGIN_SET_ERROR_AND_MESSAGE,
    payload: { field, error, errorMessage },
  }
}
