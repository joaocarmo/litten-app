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
  containerStyle,
  ...otherProps
}) =>
  active ? (
    <View
      style={[
        styles.uiLoader,
        containerStyle,
        transparent ? styles.uiLoaderTransparent : undefined,
      ]}>
      <ActivityIndicator
        animating={active}
        color={colors.blue}
        {...otherProps}
      />
    </View>
  ) : null

const styles = StyleSheet.create({
  uiLoader: {
    flex: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    maxWidth: DEVICE_WIDTH,
    minWidth: '100%',
    top: 0,
    opacity: 1,
    zIndex: 1,
    backgroundColor: colors.lightGray,
  },
  uiLoaderTransparent: {
    opacity: 0.8,
  },
})

export default UILoader
