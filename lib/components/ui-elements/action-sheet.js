/**
 * @format
 * @flow
 */

import { ActionSheetIOS, Alert, Platform } from 'react-native'
// import { ActionSheetIOSOptions } from '@types/react-native'
import { translate } from 'utils/i18n'

const UIActionSheet = (
  options: any,
  callback: (buttonIndex: number) => void,
): void => {
  if (Platform.OS === 'ios') {
    ActionSheetIOS.showActionSheetWithOptions(options, callback)
  } else {
    /**
     * TODO: Use https://github.com/expo/react-native-action-sheet
     */
    Alert.alert(translate('feedback.errorMessages.notImplemented'))
  }
}

export default UIActionSheet
