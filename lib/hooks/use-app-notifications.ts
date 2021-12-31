import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appSettingsNotificationsSelector } from 'store/selectors'
import { setNotifications } from 'store/actions/app-settings'
import type { AppSettingsNotifications } from 'store/types'

const useAppNotifications = (): [
  AppSettingsNotifications,
  (appSettingsNotifications: AppSettingsNotifications) => void,
] => {
  const dispatch = useDispatch()
  const appSettingsNotifications = useSelector(appSettingsNotificationsSelector)
  const setAppNotifications = useCallback(
    (newAppSettingsNotifications) => {
      dispatch(setNotifications(newAppSettingsNotifications))
    },
    [dispatch],
  )
  return [appSettingsNotifications, setAppNotifications]
}

export default useAppNotifications
