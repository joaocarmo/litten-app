import { useEffect, useState } from 'react'
import remoteConfig from '@db/remote-config'
import type { FirebaseRemoteConfigTypes } from '@react-native-firebase/remote-config'

type AppConfigValues = FirebaseRemoteConfigTypes.ConfigValues

const useAppConfig = (configKey?: string): AppConfigValues => {
  const [configValue, setConfigValue] = useState<AppConfigValues>(null)

  useEffect(() => {
    if (configKey) {
      setConfigValue({ [configKey]: remoteConfig.getValue(configKey) })
    } else {
      setConfigValue(remoteConfig.getAll())
    }
  }, [configKey])

  return configValue
}

export default useAppConfig
