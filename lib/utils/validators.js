/**
 * @format
 * @flow
 */

import { parsePhoneNumberFromString as parseMobile } from 'libphonenumber-js/mobile'
import { stringifyLocation } from 'utils/functions'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import type { GLocationParsed } from 'utils/types/functions'

/**
 * Generic validators and utilities
 */

export const resetValidator = {
  error: false,
  errorMessage: '',
}

export function notNothing(): (value: any) => any {
  return (value: any) => !!value
}

export function minLength(k: number): (value: string | Array<any>) => boolean {
  return (value: string | any[]) => {
    if (value && value.length) {
      return value.length >= k
    }
    return false
  }
}

export function mustMatch(valueB: any): (valueA: any) => boolean {
  return (valueA: any) => valueA === valueB
}

export function validEmail(): (value: string) => boolean {
  const emailRE =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  return (value: string) => emailRE.test(value)
}

export function validPhoneNumber(
  country: string,
  callingCode: string | number,
): (value: string | number) => any {
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

export function isPartOfList(
  list: any[],
  itemGetter: (any) => any = ({ key }) => key,
): (value: any) => boolean {
  return (value: any) => {
    if (Array.isArray(list)) {
      return list.some((item) => itemGetter(item) === value)
    }
    return false
  }
}

export function getErrorFromValidators(
  value: any,
  conditions: { testFn: (value: any) => boolean, errorMessage: string }[],
): {| error: boolean, errorMessage: string |} {
  for (const condition of conditions) {
    const { testFn, errorMessage } = condition
    const error = !testFn(value)
    if (error) {
      return { error, errorMessage }
    }
  }
  return resetValidator
}

/**
 * Sign in, Sign up and Recover validators
 */

export function emailValidator(email: string): {|
  error: boolean,
  errorMessage: string,
|} {
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

export function displayNameValidator(displayName: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.blankName'),
    },
  ]
  return getErrorFromValidators(displayName, conditions)
}

export function passwordValidator(password: string): {|
  error: boolean,
  errorMessage: string,
|} {
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
): {| error: boolean, errorMessage: string |} {
  const conditions = [
    {
      testFn: mustMatch(password),
      errorMessage: translate('feedback.errorMessages.unmatchedPassword'),
    },
  ]
  return getErrorFromValidators(passwordConfirm, conditions)
}

export function countryValidator(country: string): {|
  error: boolean,
  errorMessage: string,
|} {
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
): {| error: boolean, errorMessage: string |} {
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

export function avatarValidator(avatar: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: notNothing(),
      errorMessage: translate('feedback.errorMessages.invalidPhoto'),
    },
  ]
  return getErrorFromValidators(avatar, conditions)
}

/**
 * New litten validators
 */

export function littenPhotoValidator(photos: string[]): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: minLength(1),
      errorMessage: translate('feedback.errorMessages.invalidLittenPhoto'),
    },
  ]
  return getErrorFromValidators(photos, conditions)
}

export function littenTitleValidator(title: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: notNothing(),
      errorMessage: translate('feedback.errorMessages.invalidLittenTitle'),
    },
  ]
  return getErrorFromValidators(title, conditions)
}

export function littenSpeciesValidator(species: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: isPartOfList(littenSpeciesList),
      errorMessage: translate('feedback.errorMessages.invalidLittenSpecies'),
    },
  ]
  return getErrorFromValidators(species, conditions)
}

export function littenTypeValidator(type: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: isPartOfList(littenTypes),
      errorMessage: translate('feedback.errorMessages.invalidLittenType'),
    },
  ]
  return getErrorFromValidators(type, conditions)
}

export function littenStoryValidator(story: string): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: minLength(7),
      errorMessage: translate('feedback.errorMessages.invalidLittenStory'),
    },
  ]
  return getErrorFromValidators(story, conditions)
}

export function littenLocationValidator(location: GLocationParsed): {|
  error: boolean,
  errorMessage: string,
|} {
  const conditions = [
    {
      testFn: notNothing(),
      errorMessage: translate('feedback.errorMessages.invalidLittenLocation'),
    },
  ]
  return getErrorFromValidators(stringifyLocation(location), conditions)
}
