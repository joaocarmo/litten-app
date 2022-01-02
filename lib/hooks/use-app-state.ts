import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'

const useAppState = (callbackFn: (state: string) => void): void => {
  const eventListenerRef = useRef(null)

  useEffect(() => {
    eventListenerRef.current = AppState.addEventListener('change', callbackFn)

    return () => {
      if (typeof eventListenerRef?.current?.remove === 'function') {
        eventListenerRef.current.remove()
      }
    }
  }, [callbackFn])
}

export default useAppState
