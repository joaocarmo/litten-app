/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { Litten as LittenLogo } from 'images/components/logo'
import { UI_ABOUT_LOGO_HEIGHT, UI_ABOUT_LOGO_WIDTH } from 'utils/constants'
import colors from 'styles/colors'

const Header: () => React$Node = () => (
  <View style={styles.header}>
    <LittenLogo
      height={UI_ABOUT_LOGO_HEIGHT}
      width={UI_ABOUT_LOGO_WIDTH}
      fill={colors.blue}
    />
  </View>
)

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Header
