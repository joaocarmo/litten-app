import { APP_IS_DEV } from 'utils/env'
import crashlytics from 'db/crashlytics'

/**
 * Logs whatever is passed as an argument (ERROR)
 * - to the console, during development
 * - to the cloud, in production
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const logError = (...args: any[]) => {
  if (APP_IS_DEV) {
    console.warn(...args)
  } else {
    const [err] = args
    crashlytics.recordError(err)
  }
}

/**
 * Logs whatever is passed as an argument (INFO)
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const debugLog = (...args: any[]) => {
  if (APP_IS_DEV) {
    console.log(...args)
  }
}
