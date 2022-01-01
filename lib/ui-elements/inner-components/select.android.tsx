import { StyleSheet } from 'react-native'
import UISelectPicker from '@ui-elements/inner-components/select-picker'

const AndroidSelect = ({ ...otherProps }) => (
  <UISelectPicker style={styles.androidSelect} {...otherProps} />
)

const styles = StyleSheet.create({
  androidSelect: {
    position: 'absolute',
    top: 0,
    width: 2000,
    height: 2000,
  },
})
export default AndroidSelect
