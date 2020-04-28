/**
 * @format
 * @flow strict-local
 */

import md5Hex from 'md5-hex'
import { translate } from './i18n'

export function timeout(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function sleep(s = 0, ...args) {
  await timeout(s * 1000)
}

export async function asyncTimeout(fn, ms = 0, ...args) {
  await timeout(ms)
  return fn(...args)
}

export function iterateTimes(n, offset = 1) {
  if (n < 0) {
    return []
  }
  return [...Array(n)].map((v, i) => i + offset)
}

export function mapCountriesToSelector(item) {
  if (typeof item === 'object') {
    return {
      key: item.cca2,
      label: item.name?.common,
      value: item.cca2,
    }
  }
}

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

export function logError(...args) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args)
  }
}
