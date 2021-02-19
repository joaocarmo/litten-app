import { useCallback, useEffect } from 'react'
import Toast from 'react-native-simple-toast'
import { useNetInfo } from '@react-native-community/netinfo'
import useDebouncedCallback from 'hooks/use-debounced-callback'
import { DEBOUNCE_TIMEOUT } from 'utils/constants'
import { translate } from 'utils/i18n'

const useConnectionStatus = () => {
  const { isInternetReachable } = useNetInfo()

  const showToast = useDebouncedCallback(
    useCallback(() => {
      if (isInternetReachable === false) {
        Toast.showWithGravity(
          translate('feedback.system.noInternetConnection'),
          Toast.LONG,
          Toast.TOP,
        )
      }
    }, [isInternetReachable]),
    100 * DEBOUNCE_TIMEOUT,
  )

  useEffect(() => {
    showToast()
  }, [isInternetReachable, showToast])
}

export default useConnectionStatus
