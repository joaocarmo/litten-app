import { useEffect, useState } from 'react'
import remoteConfig from 'db/remote-config'

const useAppConfig = (configKey: string): any => {
  const [configValue, setConfigValue] = useState(null)
  useEffect(() => {
    if (configKey) {
      setConfigValue(remoteConfig.getValue(configKey))
    } else {
      setConfigValue(remoteConfig.getAll())
    }
  }, [configKey])
  return configValue
}

export default useAppConfig
