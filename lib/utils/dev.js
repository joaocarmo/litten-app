/**
 * @format
 * @flow
 */

import crashlytics from 'db/crashlytics'

/**
 * Returns whether the app is running in development mode
 * @returns {boolean}
 */
export const isDev = () => process.env.NODE_ENV === 'development'

/**
 * Logs whatever is passed as an argument (ERROR)
 * - to the console, during development
 * - to the cloud, in production
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const logError = (...args: any[]) => {
  if (isDev()) {
    console.warn(...args)
  } else {
    const params = args.length > 1 ? [...args] : args[0]
    const message = JSON.stringify(params)
    crashlytics.log(message)
  }
}

/**
 * Logs whatever is passed as an argument (INFO)
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const debugLog = (...args: any[]) => {
  if (isDev()) {
    console.log(...args)
  }
}
