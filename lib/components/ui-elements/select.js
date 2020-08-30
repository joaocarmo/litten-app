/**
 * @format
 * @flow
 */

import { Platform } from 'react-native'
import IOSSelect from './inner-components/select-ios'
import UISelectPicker from './inner-components/select-picker'

const UISelect = Platform.select({
  ios: () => IOSSelect,
  android: () => UISelectPicker,
})()

export default UISelect
