/**
 * @format
 * @flow
 */

import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { DEVICE_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const FormKeyboardAvoidingView: (args: any) => React$Node = ({
  children,
  factor = 4,
}) => (
  <KeyboardAvoidingView
    behavior="position"
    keyboardVerticalOffset={Math.round(DEVICE_HEIGHT / factor)}
    contentContainerStyle={styles.contentContainer}
    style={styles.container}>
    {children}
  </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '100%',
    backgroundColor: colors.lightGray,
  },
})

export default FormKeyboardAvoidingView
