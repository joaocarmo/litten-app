import { NETWORK_TIMEOUT } from '@utils/constants'

type RequestInit = Parameters<typeof fetch>[1]

/**
 * Wraps fetch with a timeout
 * @async
 * @param {integer} ms - The timeout value in ms
 * @returns {function}
 */
export const fetchWithTimeout =
  (ms: number) => (url, options?: RequestInit) => {
    const { signal } = options || {}
    const abortController = new AbortController()
    const fetchPromise = fetch(url, {
      ...options,
      signal: abortController.signal,
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
