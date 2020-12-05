/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet } from 'react-native'
import UIImage from 'ui-elements/image'
import {
  UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
  UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
  UI_PRESSED_OPACITY,
} from 'utils/constants'
import colors from 'styles/colors'

const UIImagePlaceholderImageItem: (args: any) => React$Node = ({
  source,
  onPress,
  onLongPress,
}) => (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    style={({ pressed }) =>
      pressed ? styles.uiImagePlaceholderPressed : undefined
    }>
    <UIImage source={source} style={styles.uiImagePlaceholderCommon} />
  </Pressable>
)

const styles = StyleSheet.create({
  uiImagePlaceholderCommon: {
    height: UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
    aspectRatio: 1,
    margin: UI_IMAGE_PLACEHOLDER_ITEM_MARGIN,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  uiImagePlaceholderPressed: {
    opacity: UI_PRESSED_OPACITY,
  },
})

export default UIImagePlaceholderImageItem
