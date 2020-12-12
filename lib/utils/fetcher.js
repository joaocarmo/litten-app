/**
 * @format
 * @flow
 */

import { NETWORK_TIMEOUT } from 'utils/constants'

/**
 * Wraps fetch with a timeout
 * @async
 * @param {integer} ms - The timeout value in ms
 * @returns {function}
 */
export const fetchWithTimeout = (ms: number) => (
  url: string,
  { signal, ...options }: $FlowFixMe = {},
) => {
  // eslint-disable-next-line no-undef
  const abortController = new AbortController()
  const fetchPromise = fetch(url, {
    signal: abortController.signal,
    ...options,
  })
  const timeoutId = setTimeout(() => abortController.abort(), ms)

  if (signal) {
    signal.addEventListener('abort', () => abortController.abort())
  }

  return fetchPromise.finally(() => clearTimeout(timeoutId))
}

/**
 * Wraps fetch with a timeout in order to provide the same API
 * @async
 * @param {string} url - A URL for the request
 * @param {{}} options - Request options
 * @returns {Promise}
 */
const fetcher = fetchWithTimeout(NETWORK_TIMEOUT)

export default fetcher
