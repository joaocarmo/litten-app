/**
 * @format
 * @flow strict-local
 */

import md5Hex from 'md5-hex'
import { translate } from './i18n'

/**
 * Creates an iteratable with 'n' elements starting at 'offset'
 * @param {number} n - Number of elements to create
 * @param {number} [offset=1] - Sets the value for the first element
 * @returns {number[]}
 */
export function iterateTimes(n, offset = 1) {
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
export function mapCountriesToSelector(item) {
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
export function getErrorMessage(type, code) {
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
 * @param {(string|null)} avatar - URI location of the user's avatar
 * @param {{email: string}} options - Extra options, e.g. the user's email
 * @returns {string}
 */
export function parseAvatar(avatar = null, { email = '' } = {}) {
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
export function logError(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args)
  }
}
