export const FORM_LOGIN_CLEAR = 'FORM_LOGIN_CLEAR'
export const FORM_LOGIN_CLEAR_ERRORS = 'FORM_LOGIN_CLEAR_ERRORS'
export const FORM_LOGIN_SET_EMAIL = 'FORM_LOGIN_SET_EMAIL'
export const FORM_LOGIN_SET_PASSWORD = 'FORM_LOGIN_SET_PASSWORD'
export const FORM_LOGIN_SET_ERROR_AND_MESSAGE =
  'FORM_LOGIN_SET_ERROR_AND_MESSAGE'

export function clearLoginForm() {
  return {
    type: FORM_LOGIN_CLEAR,
  }
}

export function clearErrorsLoginForm() {
  return {
    type: FORM_LOGIN_CLEAR_ERRORS,
  }
}

export function setEmail(email) {
  return {
    type: FORM_LOGIN_SET_EMAIL,
    payload: email,
  }
}

export function setPassword(password) {
  return {
    type: FORM_LOGIN_SET_PASSWORD,
    payload: password,
  }
}

export function setErrorAndMessage(field, error, errorMessage) {
  return {
    type: FORM_LOGIN_SET_ERROR_AND_MESSAGE,
    payload: { field, error, errorMessage },
  }
}
