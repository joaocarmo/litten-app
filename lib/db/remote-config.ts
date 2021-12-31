import remoteConfig from '@react-native-firebase/remote-config'
import remoteConfigDefaults from 'config/remote-config/defaults'
import { debugLog } from 'utils/dev'
const defaultAppRemoteConfig: any = remoteConfig()
export const setupRemoteConfig = async () => {
  await defaultAppRemoteConfig.setDefaults(remoteConfigDefaults)
  debugLog('[REMOTE CONFIG] SETUP COMPLETE')
  debugLog(
    '[REMOTE CONFIG] defaults',
    JSON.stringify(remoteConfigDefaults, null, 2),
  )
  const fetchedRemotely = await defaultAppRemoteConfig.fetchAndActivate()

  if (fetchedRemotely) {
    debugLog('[REMOTE CONFIG] FETCHED REMOTE CONFIG')
  } else {
    debugLog('[REMOTE CONFIG] USING LOCAL CONFIG')
  }
}
export default defaultAppRemoteConfig
