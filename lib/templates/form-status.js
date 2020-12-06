/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import {
  Error as ErrorIcon,
  Success as SuccessIcon,
} from 'images/components/icons'
import { UI_OPERATION_STATUS_ICON_SIZE } from 'utils/constants'
import colors from 'styles/colors'

const FormStatusTemplate: (args: any) => React$Node = ({
  success,
  error,
  children,
}) => (
  <View style={styles.container}>
    {success && (
      <SuccessIcon
        height={UI_OPERATION_STATUS_ICON_SIZE}
        width={UI_OPERATION_STATUS_ICON_SIZE}
        fill={colors.purple}
        style={styles.image}
      />
    )}
    {error && (
      <ErrorIcon
        height={UI_OPERATION_STATUS_ICON_SIZE}
        width={UI_OPERATION_STATUS_ICON_SIZE}
        fill={colors.red}
        style={styles.image}
      />
    )}
    <Text style={styles.text}>{children}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    padding: 10,
  },
  text: {
    width: vw(70),
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkGray,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
})

export default FormStatusTemplate
