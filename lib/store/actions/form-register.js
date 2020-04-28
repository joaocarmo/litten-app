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

export function clearRegisterForm() {
  return {
    type: FORM_REGISTER_CLEAR,
  }
}

export function clearErrorsRegisterForm() {
  return {
    type: FORM_REGISTER_CLEAR_ERRORS,
  }
}

export function setDisplayName(displayName) {
  return {
    type: FORM_REGISTER_SET_FULL_NAME,
    payload: displayName,
  }
}

export function setEmail(email) {
  return {
    type: FORM_REGISTER_SET_EMAIL,
    payload: email,
  }
}

export function setPassword(password) {
  return {
    type: FORM_REGISTER_SET_PASSWORD,
    payload: password,
  }
}

export function setPasswordConfirm(passwordConfirm) {
  return {
    type: FORM_REGISTER_SET_PASSWORD_CONFIRM,
    payload: passwordConfirm,
  }
}

export function setCountry(country) {
  return {
    type: FORM_REGISTER_SET_COUNTRY,
    payload: country,
  }
}

export function setCallingCode(callingCode) {
  return {
    type: FORM_REGISTER_SET_CALLING_CODE,
    payload: callingCode,
  }
}

export function setPhoneNumber(phoneNumber) {
  return {
    type: FORM_REGISTER_SET_PHONE_NUMBER,
    payload: phoneNumber,
  }
}

export function setAvatar(avatar) {
  return {
    type: FORM_REGISTER_SET_AVATAR,
    payload: avatar,
  }
}

export function setErrorAndMessage(field, error, errorMessage) {
  return {
    type: FORM_REGISTER_SET_ERROR_AND_MESSAGE,
    payload: { field, error, errorMessage },
  }
}
