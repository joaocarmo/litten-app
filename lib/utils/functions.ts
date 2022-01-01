import { APP_IS_DEV, IS_BETA_RELASE } from '@utils/env'
import base64 from 'base-64'
import md5Hex from 'md5-hex'
import isEmpty from 'lodash.isempty'
import { locationSchema } from '@db/schemas/location'
import {
  BETA_ENABLED,
  MAINTENANCE_MODE,
  VERSION_DISABLED,
} from '@config/remote-config/defaults'
import {
  EARTH_RADIUS,
  KM_PER_MI,
  MEASURE_KM,
  MEASURE_MI,
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_LIST_HEIGHT,
  USER_TYPE_INDIVIDUAL,
  USER_TYPE_ORGANIZATION,
  WEB_APP_BASE,
} from '@utils/constants'
import { littenSpeciesList, littenTypes } from '@utils/litten'
import { translate } from '@utils/i18n'
import type { DBCoordinateObject, DBLocationObject } from '@db/schemas/location'
import type { LittenFeedObject, SearchFilters } from '@store/types'
import type {
  GLocation,
  GLocationParsed,
  GResponse,
} from '@utils/types/functions'
import type { BasicChat } from '@model/types/chat'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

/**
 * Converts kms to mis
 * @param {number} km - Distance value in kms
 * @param {boolean} [useMetricUnits=true] - Use metric units
 * @param {number} [round=0] - Round the result to a certain number of decimal places
 * @returns {number}
 */
export const convertLength = (
  km: number,
  useMetricUnits = true,
  round = 0,
): number => {
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
export const getUnit = (property: string, useMetricUnits = true): string => {
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
export const iterateTimes = (n: number, offset = 1): number[] => {
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
export const mapCountriesToSelector = (item: {
  cca2: string
  name: {
    common: string
  }
}): void | {
  key: string
  label: string
  value: string
} => {
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
export const getErrorMessage = (type: string, code: string): any | string => {
  const defaultValue = 'Unknown error'

  if (type && typeof type === 'string' && code && typeof code === 'string') {
    const selector = `feedback.${type}ErrorMessages.${code}`

    if (typeof selector === 'string') {
      return translate(selector, {
        defaultValue,
      })
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
export const parseAvatar = (
  avatar = '',
  {
    email = '',
    size = 512,
  }: {
    email: string
    size?: number
  } = {},
): string => {
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
    return `${gravatarUrl}/${hash}?${query}`
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
export const isValidLocation = (location: DBLocationObject = {}): boolean => {
  if (isEmpty(location)) {
    return false
  }

  const validKeys = Object.keys(locationSchema)
  const hasValidCountryCode = (location?.country || '').length === 2
  let numValidKeys = 0
  validKeys.forEach((key) => {
    const isValidLocationValue =
      ((location?.[key] as any as string) || '').length > 1

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
export const getLocationType = (types: string[] = []): string => {
  const blacklist = ['political']
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
 * @returns {GLocation}
 */
export const parseGoogleMapResponse = (
  location: GResponse = {},
  long = false,
): GLocation => {
  const { address_components: components } = location
  const parsed = {}

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
export const mapGoogleLocationKeys = (location: GLocation): GLocationParsed => {
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
export const appendOrReplace = (
  str = '',
  newStr = '',
  {
    prefix = '',
    suffix = '',
  }: {
    prefix?: string
    suffix?: string
  } = {},
): string => {
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
export const stringifyLocation = (location: GLocationParsed): string => {
  let strLocation = ''
  const {
    country,
    administrativeArea1,
    // state
    administrativeArea2,
    // region / county
    administrativeArea4,
    // minicipality / metropolitan area
    administrativeArea5,
    // city
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
export const distanceBetween = (
  coordinatesA: DBCoordinateObject,
  coordinatesB: DBCoordinateObject,
): number => {
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
      Math.sin((latB - latA) / 2) ** 2 +
      Math.cos(latA) * Math.cos(latB) * Math.sin((lngB - lngA) / 2) ** 2
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
  list: Record<string, unknown>[],
  key = '',
): Record<string, unknown> | void =>
  list.find(({ key: objectKey }) => objectKey === key)

/**
 * Returns the index of a litten object from an array of litten objects
 * @param {Object} litten - An litten object
 * @param {Object[]} favourites - An array of litten object
 * @returns {number}
 */
export const getFavouriteIndex = (
  litten: BasicLitten,
  favourites: BasicLitten[],
): number => favourites.findIndex(({ id }) => id === litten?.id)

/**
 * Returns only the first and last instances of a name string, assuming each
 * instance is separated by a blank space
 * @param {string} fullName - A full name
 * @returns {string}
 */
export const shortenName = (fullName = ''): string => {
  const SEPARATOR = ' '

  if (fullName) {
    const names = fullName.split(SEPARATOR)
    const firstName = names.shift()
    const lastName = names.pop()
    return [firstName, lastName].join(SEPARATOR).trim()
  }

  return fullName
}

/**
 * Returns a string representation of an image's location or a base64 encoded
 * version of it, if development
 * @param {{data:string,mime:string,path:string}} image - The image object
 * @returns {string}
 */
export const getImagePath = (image: {
  data: string
  mime: string
  path: string
}): string => {
  if (image) {
    if (APP_IS_DEV) {
      return `data:${image.mime};base64,${image.data}`
    }

    return image.path
  }

  return ''
}

/**
 * Returns a string message with basic information to report a conversation
 * @param {BasicChat} chat - The Chat object
 * @param {BasicUser} user - The User object
 * @returns {string}
 */
export const prepareReportMessage = (
  chat: BasicChat,
  user: BasicUser,
): string => {
  const chatUid = chat?.id ?? ''
  const userUid = user?.id ?? ''
  return `\
--------------------------------------------------
DON'T REMOVE THIS TEXT !
--------------------------------------------------
chatUid: ${chatUid}
userUid: ${userUid}
--------------------------------------------------

`
}

/**
 * Returns the number of active filters
 * @param {SearchFilters} filters - The search filters object
 * @returns {number}
 */
export const getNumOfActiveFilters = ({
  littenSpecies,
  littenType,
  locationRadius,
  userType,
}: SearchFilters): number =>
  littenSpecies.length +
  littenType.length +
  (locationRadius > 0 ? 1 : 0) +
  (userType ? 1 : 0)

/**
 * Returns a header based on the litten object
 * @param {BasicLitten} litten - A litten object
 * @returns {string}
 */
export const littenToHeaderTitle = ({
  species = '',
  type = '',
  title = '',
}: BasicLitten = {}): string => {
  const speciesLabel = getFromListByKey(littenSpeciesList, species)?.labelOne
  const typeLabel = getFromListByKey(littenTypes, type)?.label
  return title && species && type
    ? translate('screens.messages.littenTitle', {
        species: speciesLabel,
        title,
        type: typeLabel,
      })
    : translate('screens.messages.littenRemoved')
}

/**
 * Returns the proper share URI for a litten
 * @param {BasicLitten} litten - A litten object
 * @param {boolean} [univeral=false] - Whether to generate a universal link
 * @returns {string}
 */
export const buildShareURI = (litten: BasicLitten, univeral = true): string => {
  if (litten?.id) {
    if (!univeral) {
      return `litten://litten/${litten.id}`
    }

    return `${WEB_APP_BASE}/open/litten/${litten.id}`
  }

  return ''
}

/**
 * Returns the proper basic auth header for a fetch request
 * @param {string} user
 * @param {string} password
 * @returns {string}
 */
export const createAuthHeader = (user: string, password: string): string => {
  if (user && password) {
    const usrpwd = `${user}:${password}`
    const encodedUsrPwd = base64.encode(usrpwd)
    return `Basic ${encodedUsrPwd}`
  }

  return ''
}

/**
 * Returns an array of strings from a single string
 * @param {string} str
 * @returns {string[]}
 */
export const string2tags = (str: string): string[] => {
  const tags = str
    .replace(/#/g, '')
    .split(' ')
    .map((token) => token.trim().toLowerCase())
    .filter((token) => !!token)
  return [...new Set(tags)]
}

/**
 * Returns an object to be used on the react native virtualized lists
 * @param {*} data
 * @param {number} index
 * @returns {{length: number, offset: number, index: number}}
 */
export const getListItemLayout = (
  data: unknown,
  index: number,
): {
  index: number
  length: number
  offset: number
} => {
  const fullSize = UI_ELEMENT_LIST_HEIGHT + UI_ELEMENT_BORDER_MARGIN * 2

  return {
    length: fullSize,
    offset: fullSize * index,
    index,
  }
}

/**
 * Filters the home feed data based on the active filters
 * @param {LittenFeedObject[]} data
 * @param {{filters: SearchFilters}} searchFilters
 * @returns {LittenFeedObject[]}
 */
export const filterData = (
  data: LittenFeedObject[],
  {
    filters = {},
  }: {
    filters?: SearchFilters
  },
): LittenFeedObject[] => {
  if (!isEmpty(data) && !isEmpty(filters)) {
    const {
      littenSpecies: filterSpecies = '',
      littenType: filterType = '',
      locationRadius: filterRadius = 0,
      userType: filterUserType = '',
    } = filters
    const filteredData: LittenFeedObject[] = data.filter(
      ({ distance, isFromOrganization, species, type }) => {
        let isAllowed = true

        if (
          filterSpecies.length &&
          species &&
          !filterSpecies.includes(species)
        ) {
          isAllowed = isAllowed && false
        }

        if (filterType.length && type && !filterType.includes(type)) {
          isAllowed = isAllowed && false
        }

        if (filterRadius && filterRadius < +distance) {
          isAllowed = isAllowed && false
        }

        if (filterUserType === USER_TYPE_INDIVIDUAL && isFromOrganization) {
          isAllowed = isAllowed && false
        }

        if (filterUserType === USER_TYPE_ORGANIZATION && !isFromOrganization) {
          isAllowed = isAllowed && false
        }

        return isAllowed
      },
    )
    return filteredData
  }

  return data
}

/**
 * Starts a race condition between a promise that may take a long time to
 * resolve/reject and a timeout limit.
 * @async
 * @param {Promise} asyncFn A promise that may take a long time to resolve/reject
 * @param {number} timeout The execution time limit for the promise
 * @returns {Promise}
 */
export const execOrTimeout = (
  asyncFn: Promise<unknown>,
  timeout: number,
): Promise<unknown> => {
  const racePromise = new Promise((resolve, reject) => {
    setTimeout(reject, timeout, new Error('Async function timed out'))
  })
  return Promise.race([asyncFn, racePromise])
}

/**
 * Parses the remote config object and returns whether the reason why the app
 * is blocked.
 * @param {{[key: string]: *}} appConfig The remote config object
 * @returns {string}
 */
export const blockingValidator = (
  appConfig: Record<string, unknown>,
): string => {
  const appIsBlocked = ''

  if (!appConfig) {
    return appIsBlocked
  }

  const entries = Object.entries(appConfig)

  for (const entry of entries) {
    const [key, value]: [string, unknown] = entry

    if (key === BETA_ENABLED && IS_BETA_RELASE && value.asBoolean() === false) {
      return BETA_ENABLED
    }

    if (key === MAINTENANCE_MODE && value.asBoolean() === true) {
      return MAINTENANCE_MODE
    }

    if (key === VERSION_DISABLED && value.asBoolean() === true) {
      return VERSION_DISABLED
    }
  }

  return appIsBlocked
}

/**
 * Converts an opacity value to its hexadecimal equivalent.
 * @param {number} opacity The opacity value in a 0-100 scale
 * @returns {string}
 */
export const opacity2Hex = (opacity: number): string =>
  Math.ceil((opacity / 100) * 255).toString(16)
