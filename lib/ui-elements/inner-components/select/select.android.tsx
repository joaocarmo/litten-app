import { StyleSheet } from 'react-native'
import UISelectPicker from '@ui-elements/inner-components/select/picker'
import type { IOSSelectProps } from '@ui-elements/inner-components/select'

const AndroidSelect = (props: IOSSelectProps) => (
  <UISelectPicker style={styles.androidSelect} {...props} />
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
