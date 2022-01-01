import { useSelector } from 'react-redux'
import { appSettingsSelector } from '@store/selectors'
import { AppSettings } from '@store/types'

const useAppSettings = (): [AppSettings] => {
  const appSettings = useSelector(appSettingsSelector)
  return [appSettings]
}

export default useAppSettings
