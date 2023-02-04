import { APP_IS_DEV, APP_IS_TEST } from '@utils/env'
import crashlytics from '@db/crashlytics'

/**
 * Logs whatever is passed as an argument (ERROR)
 * - to the console, during development
 * - to the cloud, in production
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const logError = (...args: unknown[]) => {
  if (APP_IS_TEST) {
    return
  }

  if (APP_IS_DEV) {
    // eslint-disable-next-line no-console
    console.warn(...args)
  } else {
    const [err] = args

    if (err instanceof Error) {
      crashlytics.recordError(err)
    }
  }
}

/**
 * Logs whatever is passed as an argument (INFO)
 * @param {...any} args - List of arguments to be logged
 * @returns {void}
 */
export const debugLog = (...args: unknown[]) => {
  if (APP_IS_TEST) {
    return
  }

  if (APP_IS_DEV) {
    // eslint-disable-next-line no-console
    console.log(...args)
  }
}
