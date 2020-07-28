/**
 * @format
 * @flow
 */

import { parsePhoneNumberFromString as parseMobile } from 'libphonenumber-js/mobile'
import { translate } from './i18n'

export function notNothing() {
  return (value: any) => !!value
}

export function minLength(k: number) {
  return (value: string) => {
    if (value && value.length) {
      return value.length >= k
    }
    return false
  }
}

export function mustMatch(valueB: any) {
  return (valueA: any) => valueA === valueB
}

export function validEmail() {
  const emailRE = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return (value: string) => emailRE.test(value)
}

export function validPhoneNumber(
  country: string,
  callingCode: string | number,
) {
  return (value: string | number) => {
    let isValid = false
    const phoneNumber = parseMobile(value, country)
    isValid = phoneNumber && phoneNumber.isValid()
    if (!isValid) {
      const phoneNumberFull = parseMobile(`${callingCode}${value}`)
      isValid = phoneNumberFull && phoneNumberFull.isValid()
    }
    return isValid ?? false
  }
}

export function getErrorFromValidators(
  value: any,
  conditions: { testFn: (value: any) => boolean, errorMessage: string }[],
) {
  for (const condition of conditions) {
    const { testFn, errorMessage } = condition
    const error = !testFn(value)
    if (error) {
      return { error, errorMessage }
    }
  }
  return { error: false, errorMessage: '' }
}

export function emailValidator(email: string) {
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

export function displayNameValidator(displayName: string) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankName'),
    },
  ]
  return getErrorFromValidators(displayName, conditions)
}

export function passwordValidator(password: string) {
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

export function passwordConfirmValidator(
  passwordConfirm: string,
  password: string,
) {
  const conditions = [
    {
      testFn: mustMatch(password),
      errorMessage: translate('feedback.errorMessages.unmatchedPassword'),
    },
  ]
  return getErrorFromValidators(passwordConfirm, conditions)
}

export function countryValidator(country: string) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankCountry'),
    },
  ]
  return getErrorFromValidators(country, conditions)
}

export function phoneNumberValidator(
  phoneNumber: string | number,
  country: string,
  callingCode: string | number,
) {
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

export function avatarValidator(avatar: string) {
  const conditions = [
    {
      testFn: notNothing(),
      errorMessage: translate('feedback.errorMessages.invalidPhoto'),
    },
  ]
  return getErrorFromValidators(avatar, conditions)
}
