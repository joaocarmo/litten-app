/**
 * @format
 * @flow
 */

import { store } from 'store'

/**
 * Logs whatever is passed as an argument (ERROR)
 * - to the console, during development
 * - to the cloud, in production
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export function logError(...args: any[]) {
  const {
    authenticatedUser: {
      preferences: { shareMetrics },
    },
  } = store.getState()
  if (shareMetrics) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(...args)
    }
  }
}

/**
 * Logs whatever is passed as an argument (INFO)
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export function debugLog(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args)
  }
}
