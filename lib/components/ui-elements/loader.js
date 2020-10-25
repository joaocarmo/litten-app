/**
 * @format
 * @flow
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { DEVICE_WIDTH } from 'utils/constants'
import colors from 'styles/colors'

const UILoader: (args: any) => React$Node = ({
  active = false,
  transparent = false,
  style,
  ...otherProps
}) =>
  active ? (
    <View
      {...otherProps}
      opacity={transparent ? 0.8 : null}
      style={StyleSheet.compose(styles.uiLoader, style)}>
      <ActivityIndicator />
    </View>
  ) : null

const styles = StyleSheet.create({
  uiLoader: {
    flex: 0,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    maxWidth: DEVICE_WIDTH,
    minWidth: '100%',
    top: 0,
    zIndex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default UILoader
