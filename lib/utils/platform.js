/**
 * @format
 * @flow
 */

import { Alert } from 'react-native'
import { isEmulator } from 'react-native-device-info'
import { translate } from 'utils/i18n'
import { logError } from 'utils/dev'

/**
 * Determines whether the host device has camera capabilities
 * @async
 * @returns {Promise.<boolean>}
 */
export async function cameraIsAvailable() {
  let cameraAvailable = false
  try {
    const isCameraUnavailable = await isEmulator()
    if (isCameraUnavailable) {
      Alert.alert(translate('easterEggs.simulation'))
    } else {
      cameraAvailable = true
    }
  } catch (err) {
    logError(err)
  }
  return cameraAvailable
}
