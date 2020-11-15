/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, Text, View } from 'react-native'
import UIImage from '../image'
import { iconCamera } from 'images'
import { UI_IMAGE_PLACEHOLDER_ITEM_SIZE } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UIImagePlaceholderItem: (args: any) => React$Node = ({
  actionable = false,
  onLongPress,
  onPress,
  style,
  ...otherProps
}) => {
  if (!actionable) {
    return (
      <View
        {...otherProps}
        style={StyleSheet.compose(uiImagePlaceholderStyle, style)}
      />
    )
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) =>
        pressed ? styles.uiImagePlaceholderPressed : undefined
      }>
      <View
        {...otherProps}
        style={StyleSheet.compose(uiImagePlaceholderActionableStyle, style)}>
        <UIImage source={iconCamera} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>
          {translate('ui.elements.imagePlaceholder')}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  uiImagePlaceholderCommon: {
    height: UI_IMAGE_PLACEHOLDER_ITEM_SIZE,
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  uiImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiImagePlaceholderActionable: {
    backgroundColor: colors.blue,
  },
  uiImagePlaceholderPressed: {
    opacity: 0.6,
  },
  placeholderIcon: {
    height: 32,
    width: 36,
    margin: 8,
    tintColor: colors.white,
  },
  placeholderText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
  },
})

const uiImagePlaceholderStyle = StyleSheet.compose(
  styles.uiImagePlaceholderCommon,
  styles.uiImagePlaceholder,
)
const uiImagePlaceholderActionableStyle = StyleSheet.compose(
  uiImagePlaceholderStyle,
  styles.uiImagePlaceholderActionable,
)

export default UIImagePlaceholderItem
