/**
 * @format
 * @flow
 */

import md5Hex from 'md5-hex'
import isEmpty from 'lodash.isempty'
import { locationSchema } from 'db/schemas/location'
import type { DBCoordinateObject, DBLocationObject } from 'db/schemas/location'
import type { LittenObject } from 'store/types'
import type { GResponse, GLocation, GLocationParsed } from './types/functions'
import { EARTH_RADIUS, MEASURE_KM, MEASURE_MI, KM_PER_MI } from './constants'
import { translate } from './i18n'

/**
 * Converts kms to mis
 * @param {number} km - Distance value in kms
 * @param {boolean} [useMetricUnits=true] - Use metric units
 * @param {number} [round=0] - Round the result to a certain number of decimal places
 * @returns {number}
 */
export function convertLength(
  km: number,
  useMetricUnits: boolean = true,
  round: number = 0,
): number {
  let value = km

  if (value <= 0) {
    return 0
  }

  if (!useMetricUnits) {
    value = km * KM_PER_MI
  }

  return parseInt(Math.ceil(value).toFixed(round), 10)
}

/**
 * Returns either the metric or imperial unit of measurment
 * @param {string} property - Property to get the unit to
 * @param {boolean} [useMetricUnits=true] - Use metric units
 * @returns {string}
 */
export function getUnit(
  property: string,
  useMetricUnits: boolean = true,
): string {
  const units = {
    metric: {
      length: MEASURE_KM,
    },
    imperial: {
      length: MEASURE_MI,
    },
  }

  const key = useMetricUnits ? 'metric' : 'imperial'

  return units[key][property]
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
  { email = '', size = 256 }: { email: string, size?: number } = {},
): string {
  if (typeof avatar === 'string' && avatar.length) {
    return avatar
  }
  // Grab a gravatar
  if (typeof email === 'string' && email.length) {
    // The Gravatar image service
    const gravatarUrl = 'https://s.gravatar.com/avatar'
    // The size query and default if no gravatar exists
    const query = `s=${size}&d=mp`
    // Gravatar uses MD5 hashes from an email address (all lowercase)
    const hash = md5Hex(email.toLowerCase())
    // The full avatar URL
    avatar = `${gravatarUrl}/${hash}?${query}`
    return avatar
  }
  return ''
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
export function mapGoogleLocationKeys(location: GLocation): GLocationParsed {
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

/**
 * Converts degrees into radians
 * @param {number} degree - A number in degrees
 * @returns {number}
 */
export const degToRad = (degrees: number): number => (degrees * Math.PI) / 180

/**
 * Calculates the minimum distance between two given coordinates on the surface
 * of planet Earth
 * @param {DBCoordinateObject} coordinatesA - A coordinates object
 * @param {DBCoordinateObject} coordinatesB - A coordinates object
 * @returns {number}
 */
export function distanceBetween(
  coordinatesA: DBCoordinateObject,
  coordinatesB: DBCoordinateObject,
): number {
  const { latitude: latAdeg, longitude: lngAdeg } = coordinatesA
  const { latitude: latBdeg, longitude: lngBdeg } = coordinatesB

  if (
    typeof latAdeg === 'number' &&
    typeof lngAdeg === 'number' &&
    typeof latBdeg === 'number' &&
    typeof lngBdeg === 'number'
  ) {
    const latA = degToRad(latAdeg)
    const latB = degToRad(latBdeg)
    const lngA = degToRad(lngAdeg)
    const lngB = degToRad(lngBdeg)

    // Apply the Haversine formula
    const h =
      Math.pow(Math.sin((latB - latA) / 2), 2) +
      Math.cos(latA) * Math.cos(latB) * Math.pow(Math.sin((lngB - lngA) / 2), 2)

    return 2 * EARTH_RADIUS * Math.asin(Math.sqrt(h))
  }

  return 0
}

/**
 * Returns an object within an array when its key matches a certain value
 * @param {Object[]} list - An array of objects
 * @param {string} key - A string to match the object's key with
 * @returns {Object|void}
 */
export const getFromListByKey = (
  list: { [key: string]: any }[],
  key: string,
): { [key: string]: any } | void =>
  list.find(({ key: objectKey }) => objectKey === key)

/**
 * Returns the index of a litten object from an array of litten objects
 * @param {Object} litten - An litten object
 * @param {Object[]} favourites - An array of litten object
 * @returns {number}
 */
export const getFavouriteIndex = (
  litten: LittenObject,
  favourites: LittenObject[],
): number => {
  return favourites.findIndex(({ id }) => id === litten.id)
}

/**
 * Returns only the first and last instances of a name string, assuming each
 * instance is separated by a blank space
 * @param {string} fullName - A full name
 * @returns {string}
 */
export const shortenName = (fullName: string): string => {
  const SEPARATOR = ' '

  if (fullName) {
    const names = fullName.split(SEPARATOR)
    const firstName = names.shift()
    const lastName = names.pop()
    return [firstName, lastName].join(SEPARATOR).trim()
  }

  return fullName
}
