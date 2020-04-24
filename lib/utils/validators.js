/**
 * @format
 * @flow strict-local
 */
import { parsePhoneNumberFromString as parseMobile } from 'libphonenumber-js/mobile'
import { translate } from './i18n'

export function notNothing() {
  return (value) => !!value
}

export function minLength(k) {
  return (value) => {
    if (value && value.length) {
      return value.length >= k
    }
    return false
  }
}

export function mustMatch(valueB) {
  return (valueA) => valueA === valueB
}

export function validEmail() {
  const emailRE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return (value) => emailRE.test(value)
}

export function validPhoneNumber(country, callingCode) {
  return (value) => {
    let isValid = false
    const phoneNumber = parseMobile(value, country)
    isValid = phoneNumber && phoneNumber.isValid()
    if (!isValid) {
      const phoneNumberFull = parseMobile(`${callingCode}${value}`)
      isValid = phoneNumberFull && phoneNumberFull.isValid()
    }
    return isValid
  }
}

export function getErrorFromValidators(value, conditions) {
  for (const condition of conditions) {
    const { testFn, errorMessage } = condition
    const error = !testFn(value)
    if (error) {
      return { error, errorMessage }
    }
  }
  return { error: false, errorMessage: '' }
}

export function emailValidator(email) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankEmail'),
    },
    {
      testFn: validEmail(),
      errorMessage: translate('feedback.errorMessages.invalidEmail'),
    },
  ]
  return getErrorFromValidators(email, conditions)
}

export function fullNameValidator(fullName) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankName'),
    },
  ]
  return getErrorFromValidators(fullName, conditions)
}

export function passwordValidator(password) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankPassword'),
    },
    {
      testFn: minLength(10),
      errorMessage: translate('feedback.errorMessages.invalidPassword'),
    },
  ]
  return getErrorFromValidators(password, conditions)
}

export function passwordConfirmValidator(passwordConfirm, password) {
  const conditions = [
    {
      testFn: mustMatch(password),
      errorMessage: translate('feedback.errorMessages.unmatchedPassword'),
    },
  ]
  return getErrorFromValidators(passwordConfirm, conditions)
}

export function countryValidator(country) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankCountry'),
    },
  ]
  return getErrorFromValidators(country, conditions)
}

export function phoneNumberValidator(phoneNumber, country, callingCode) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankPhoneNumber'),
    },
    {
      testFn: validPhoneNumber(country, callingCode),
      errorMessage: translate('feedback.errorMessages.invalidPhoneNumber'),
    },
  ]
  return getErrorFromValidators(phoneNumber, conditions)
}

export function avatarValidator(avatar) {
  const conditions = [
    {
      testFn: notNothing(),
      errorMessage: translate('feedback.errorMessages.invalidPhoto'),
    },
  ]
  return getErrorFromValidators(avatar, conditions)
}
