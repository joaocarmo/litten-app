/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UIImage } from 'ui-elements'
import { logoBlue } from 'images'

const Header: () => React$Node = () => (
  <View style={styles.header}>
    <UIImage source={logoBlue} style={styles.logo} />
  </View>
)

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 32,
    width: 115,
  },
})

export default Header
