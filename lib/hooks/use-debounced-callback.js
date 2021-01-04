/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useRef } from 'react'
import { DEBOUNCE_TIMEOUT } from 'utils/constants'

const useDebouncedCallback = (
  callbackFn: (...args: any[]) => void,
  delay: number = DEBOUNCE_TIMEOUT,
): ((args: any) => void) => {
  const argsRef = useRef()
  const timerId = useRef(null)

  const clearTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
  }

  const debouncedCallback = useCallback(
    (...args) => {
      argsRef.current = args

      clearTimer()

      timerId.current = setTimeout(() => {
        if (argsRef.current) {
          callbackFn(...argsRef.current)
        }
      }, delay)
    },
    [callbackFn, delay],
  )

  useEffect(() => clearTimer(), [delay])

  useEffect(() => () => clearTimer(), [])

  return debouncedCallback
}

export default useDebouncedCallback
