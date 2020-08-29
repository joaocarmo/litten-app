/**
 * @format
 * @flow
 */

import md5Hex from 'md5-hex'
import isEmpty from 'lodash.isempty'
import { locationSchema } from 'db/schemas/location'
import type { DBLocationObject } from 'db/schemas/location'
import type {
  GResponse,
  GLocation,
  GLocationParsed,
} from 'utils/types/functions'
import { MEASURE_KM, MEASURE_MI, KM_PER_MI } from './constants'
import { translate } from './i18n'

/**
 * Converts kms to mis
 * @param {number} km - Distance value in kms
 * @param {string} [unit=km] - Unit to convert to
 * @param {number} [round=0] - Round the result to a certain number of decimal places
 * @returns {number}
 */
export function convertLength(
  km: number,
  unit: string = MEASURE_KM,
  round: number = 0,
): number {
  if (unit === MEASURE_MI) {
    return parseInt(Math.floor(km * KM_PER_MI).toFixed(round), 10)
  }
  return km
}

/**
 * Creates an iteratable with 'n' elements starting at 'offset'
 * @param {number} n - Number of elements to create
 * @param {number} [offset=1] - Sets the value for the first element
 * @returns {number[]}
 */
export function iterateTimes(n: number, offset: number = 1): number[] {
  if (n < 0) {
    return []
  }
  return [...Array(n)].map((v, i) => i + offset)
}

/**
 * To be used as a callback function to map the countries data source to the
 * UI selector element as options
 * @param {{cca2: string, name: {common: string}}} item - Number of elements to create
 * @returns {{key: string, label: string, value: string}}
 */
export function mapCountriesToSelector(item: {
  cca2: string,
  name: { common: string },
}) {
  if (typeof item === 'object') {
    return {
      key: item.cca2,
      label: item.name?.common,
      value: item.cca2,
    }
  }
}

/**
 * Maps error messages in the translations files by type and error code
 * @param {string} type - Type of the error code to be used as a key prefix
 * @param {string} code - The error code to get the message for
 * @returns {string}
 */
export function getErrorMessage(type: string, code: string) {
  const defaultValue = 'Unknown error'
  if (type && typeof type === 'string' && code && typeof code === 'string') {
    const selector = `feedback.${type}ErrorMessages.${code}`
    if (typeof selector === 'string') {
      return translate(selector, { defaultValue })
    }
  }
  return defaultValue
}

/**
 * Parses the user's supplied image URI during the register photo step,
 * if none is supplied, a Gravatar URI is generated based on the user's email
 * @param {string} avatar - URI location of the user's avatar
 * @param {{email: string}} options - Extra options, e.g. the user's email
 * @returns {string}
 */
export function parseAvatar(
  avatar: string = '',
  { email = '' }: { email: string } = {},
) {
  if (typeof avatar === 'string' && avatar.length) {
    return avatar
  }
  // Grab a gravatar
  if (typeof email === 'string' && email.length) {
    // The Gravatar image service
    const gravatarUrl = 'https://s.gravatar.com/avatar'
    // The size query and default if no gravatar exists
    const query = 's=128&d=mp'
    // Gravatar uses MD5 hashes from an email address (all lowercase)
    const hash = md5Hex(email.toLowerCase())
    // The full avatar URL
    avatar = `${gravatarUrl}/${hash}?${query}`
    return avatar
  }
  return null
}

/**
 * Logs whatever is passed as an argument
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export function logError(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args)
  }
}

/**
 * Returns a well defined rotation object to be used with the transform style
 * property
 * @param {string} value - Rotation degress
 * @param {string} axis - Axis in which the rotation should be performed
 * @returns {Object.<string, string>}
 */
export function rotate(
  value: string = '0deg',
  axis: string = '',
): { [key: string]: string } {
  return { [`rotate${axis.toUpperCase()}`]: value }
}

/**
 * Evaluates whether a given location object is considered valid according to
 *  - Has a valid ISO 3166-1 alpha-2 country code
 *  - Has 2 or more valid keys fulfilled
 * @param {Object<string, string>} location - Location object
 * @returns {boolean}
 */
export function isValidLocation(location: DBLocationObject = {}) {
  if (isEmpty(location)) {
    return false
  }
  const validKeys = Object.keys(locationSchema)
  const hasValidCountryCode = (location?.country || '').length === 2
  let numValidKeys = 0
  validKeys.forEach((key) => {
    const isValidLocationValue =
      (((location?.[key]: any): string) || '').length > 1
    if (isValidLocationValue) {
      numValidKeys += 1
    }
  })
  return hasValidCountryCode && numValidKeys > 2
}

/**
 * Parses the array and returns the proper address type
 * @param {string[]} types - Types array
 * @returns {string}
 */
export function getLocationType(types: string[] = []) {
  let blacklist = ['political']

  const arr = [...types]
  let type = arr.shift()
  while (type && blacklist.includes(type)) {
    type = arr.shift()
  }

  return type ?? 'unknown'
}

/**
 * Parses the response received from Google's Map API
 * @param {Object} location - Google's location object
 * @param {boolean} [long=false] - Get the long name (defaults to short)
 * @returns {Object<string, string>}
 */
export function parseGoogleMapResponse(
  location: GResponse = {},
  long: boolean = false,
) {
  const { address_components: components } = location
  let parsed = {}

  if (components) {
    for (const component of components) {
      const { long_name: lName, short_name: sName, types } = component
      const type = getLocationType(types)
      const name = long ? lName : sName
      parsed[type] = name
    }
  }

  return parsed
}

/**
 * Parses the location object and returns an new object version of it
 * @param {Object.<string, string>} location - Googles's location object
 * @returns {Object.<string, string>}
 */
export function mapGoogleLocationKeys(location: GLocation) {
  const keyMap = {
    administrative_area_level_1: 'administrativeArea1',
    administrative_area_level_2: 'administrativeArea2',
    country: 'country',
    establishment: 'establishment',
    locality: 'administrativeArea5',
    neighborhood: 'administrativeArea6',
    postal_code: 'postalCode',
    route: 'street',
    street_number: 'streetNumber',
    sublocality_level_1: 'administrativeArea6',
    sublocality: 'administrativeArea6',
  }
  const mapped = {}

  if (typeof location === 'object') {
    Object.keys(location).forEach((oldKey) => {
      const newKey = keyMap?.[oldKey]
      mapped[newKey || oldKey] = location[oldKey]
    })
  }
  return mapped
}

/**
 * Parses an original string and appends a new string to it
 * @param {string} str - Original base string
 * @param {string} newStr - New string to append to the original
 * @param {{prefix: string, suffix: string}} options - Prefix and suffix to use
 * @returns {string}
 */
export function appendOrReplace(
  str?: string = '',
  newStr?: string = '',
  { prefix = '', suffix = '' }: { prefix?: string, suffix?: string } = {},
) {
  if (str) {
    return `${str}${prefix}${newStr}${suffix}`
  }
  return newStr
}

/**
 * Parses the location object and returns a string version of it
 * @param {Object} location - Litten's location object
 * @returns {string}
 */
export function stringifyLocation(location: GLocationParsed) {
  let strLocation = ''
  const {
    country,
    administrativeArea1, // state
    administrativeArea2, // region / county
    administrativeArea4, // minicipality / metropolitan area
    administrativeArea5, // city
    administrativeArea6, // neighborhood
  } = location

  if (administrativeArea5) {
    strLocation = administrativeArea5
  } else if (administrativeArea6) {
    strLocation = administrativeArea6
  }
  if (administrativeArea4) {
    strLocation = appendOrReplace(strLocation, administrativeArea4, {
      prefix: ' (',
      suffix: ')',
    })
  }
  if (administrativeArea2) {
    strLocation = appendOrReplace(strLocation, administrativeArea2, {
      prefix: ', ',
    })
  }
  if (administrativeArea1) {
    strLocation = appendOrReplace(strLocation, administrativeArea1, {
      prefix: ', ',
    })
  }
  if (country) {
    strLocation = appendOrReplace(strLocation, country, {
      prefix: ', ',
    })
  }
  return strLocation
}
