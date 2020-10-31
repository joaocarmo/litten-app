/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIImage } from 'ui-elements'
import { iconSuccess, iconError } from 'images'
import colors from 'styles/colors'

const FormStatusTemplate: (args: any) => React$Node = ({
  success,
  error,
  children,
}) => (
  <View style={styles.container}>
    {success && <UIImage source={iconSuccess} style={styles.image} />}
    {error && <UIImage source={iconError} style={styles.image} />}
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
    height: 80,
    width: 80,
    padding: 10,
  },
  text: {
    width: vw(70),
    fontSize: 20,
    fontWeight: '600',
    color: colors.darkGray,
    padding: 10,
    marginTop: 10,
    textAlign: 'center',
  },
})

export default FormStatusTemplate
