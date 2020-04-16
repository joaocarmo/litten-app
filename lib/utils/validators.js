/**
 * @format
 * @flow strict-local
 */
import { parsePhoneNumberFromString as parseMobile } from 'libphonenumber-js/mobile'

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

export function validPhoneNumber(country) {
  return (value) => {
    const phoneNumber = parseMobile(value, country)
    return phoneNumber && phoneNumber.isValid()
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
      errorMessage: "E-mail can't be blank",
    },
    {
      testFn: validEmail(),
      errorMessage: 'E-mail should be in a valid format',
    },
  ]
  return getErrorFromValidators(email, conditions)
}

export function fullNameValidator(fullName) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: "Name can't be blank",
    },
  ]
  return getErrorFromValidators(fullName, conditions)
}

export function passwordValidator(password) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: "Password can't be blank",
    },
    {
      testFn: minLength(10),
      errorMessage: 'Password should have, at least, 10 characters',
    },
  ]
  return getErrorFromValidators(password, conditions)
}

export function passwordConfirmValidator(passwordConfirm, password) {
  const conditions = [
    {
      testFn: mustMatch(password),
      errorMessage: "The passwords don't match",
    },
  ]
  return getErrorFromValidators(passwordConfirm, conditions)
}

export function countryValidator(country) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: "Country can't be blank",
    },
  ]
  return getErrorFromValidators(country, conditions)
}

export function phoneNumberValidator(phoneNumber, country) {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: "Phone number can't be blank",
    },
    {
      testFn: validPhoneNumber(country),
      errorMessage: 'Phone number should be in a valid format',
    },
  ]
  return getErrorFromValidators(phoneNumber, conditions)
}
