import { useCallback, useEffect, useRef, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { DEBOUNCE_TIMEOUT } from '@utils/constants'

const useDebouncedState = <T>(
  initialValue: T,
  delay?: number,
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue)
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
      }, delay || DEBOUNCE_TIMEOUT)
    },
    [delay],
  )

  useEffect(() => clearTimer(), [delay])

  useEffect(() => () => clearTimer(), [])

  return [value, debouncedSetValue]
}

export default useDebouncedState
