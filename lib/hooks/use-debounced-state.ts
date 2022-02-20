import { useCallback, useEffect, useRef, useState } from 'react'
import { DEBOUNCE_TIMEOUT } from '@utils/constants'

const useDebouncedState = <S>(
  initialValue: (() => S) | S,
  delay: number = DEBOUNCE_TIMEOUT,
): [S, (arg0: ((arg1: S) => S) | S) => void] => {
  const [value, setValue] = useState<S>(initialValue)
  const timerId = useRef(null)

  const clearTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current)
      timerId.current = null
    }
  }

  const debouncedSetValue = useCallback(
    (newValue) => {
      if (timerId.current) {
        clearTimer()
      }

      timerId.current = setTimeout(() => {
        setValue(newValue)
      }, delay)
    },
    [delay],
  )

  useEffect(() => clearTimer(), [delay])

  useEffect(() => () => clearTimer(), [])

  return [value, debouncedSetValue]
}

export default useDebouncedState
