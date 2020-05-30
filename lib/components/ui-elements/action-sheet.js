/**
 * @format
 * @flow strict-local
 */

import { ActionSheetIOS, Alert, Platform } from 'react-native'
import { translate } from 'utils/i18n'

const UIActionSheet = (options, callback) => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(options, callback)
  } else {
    Alert.alert(translate('feedback.errorMessages.notImplemented'))
  }
}

export default UIActionSheet
