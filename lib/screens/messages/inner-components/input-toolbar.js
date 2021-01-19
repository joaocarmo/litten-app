/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import { InputToolbar as GFInputToolbar } from 'react-native-gifted-chat'
import { UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT } from 'utils/constants'

const InputToolbar: (args: any) => React$Node = (props) => (
  <GFInputToolbar
    {...props}
    containerStyle={styles.inputToolbar}
    primaryStyle={styles.inputToolbarPrimary}
  />
)

const styles = StyleSheet.create({
  inputToolbar: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
    borderRadius: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 4,
    paddingLeft: 18,
    paddingRight: 8,
  },
  inputToolbarPrimary: {
    minHeight: UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default InputToolbar
