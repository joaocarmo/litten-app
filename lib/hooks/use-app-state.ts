import { useEffect } from 'react'
import { AppState } from 'react-native'

const useAppState = (callbackFn: (state: string) => void): void => {
  useEffect(() => {
    AppState.addEventListener('change', callbackFn)

    return () => {
      AppState.removeEventListener('change', callbackFn)
    }
  }, [callbackFn])
}

export default useAppState
