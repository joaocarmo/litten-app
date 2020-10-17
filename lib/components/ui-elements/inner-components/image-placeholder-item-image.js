/**
 * @format
 * @flow
 */

import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import colors from 'styles/colors'

const UIImagePlaceholderImageItem: (args: any) => React$Node = ({
  source,
  onPress,
  onLongPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    onLongPress={onLongPress}>
    <Image
      source={source}
      resizeMode="contain"
      style={styles.uiImagePlaceholderCommon}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  uiImagePlaceholderCommon: {
    height: vw(21),
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
})

export default UIImagePlaceholderImageItem
