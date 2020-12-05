/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import UISelectPicker from 'ui-elements/inner-components/select-picker'

const AndroidSelect: (args: any) => React$Node = ({ ...otherProps }) => (
  <UISelectPicker style={styles.androidSelect} {...otherProps} />
)

const styles = StyleSheet.create({
  androidSelect: {
    position: 'absolute',
    top: 0,
    width: 1000,
    height: 1000,
  },
})

export default AndroidSelect
