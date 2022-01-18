import { useCallback, useEffect, useRef } from 'react'
import { DEBOUNCE_TIMEOUT } from '@utils/constants'

type ParametersType = any[]

const useDebouncedCallback = (
  callbackFn: (...args: ParametersType) => void,
  delay: number = DEBOUNCE_TIMEOUT,
) => {
  const argsRef = useRef([])
  const timerId = useRef(null)

  const clearTimer = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
  }, [])

  const debouncedCallback = useCallback(
    (...args: ParametersType) => {
      argsRef.current = args

      clearTimer()

      timerId.current = setTimeout(() => {
        if (argsRef.current) {
          callbackFn(...argsRef.current)
        }
      }, delay)
    },
    [callbackFn, clearTimer, delay],
  )

  useEffect(() => clearTimer(), [clearTimer, delay])

  useEffect(() => () => clearTimer(), [clearTimer])

  return [debouncedCallback, clearTimer]
}

export default useDebouncedCallback
