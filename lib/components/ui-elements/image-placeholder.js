/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { iconCamera } from 'images'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UIImagePlaceholder = {}

const Group: () => React$Node = ({ children, style, ...otherProps }) => (
  <View
    {...otherProps}
    style={StyleSheet.compose(styles.groupContainer, style)}>
    {children}
    <View style={styles.lastRowFiller} />
  </View>
)

const Item: () => React$Node = ({
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
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View
        {...otherProps}
        style={StyleSheet.compose(uiImagePlaceholderActionableStyle, style)}>
        <Image
          source={iconCamera}
          resizeMode="contain"
          style={styles.placeholderIcon}
        />
        <Text style={styles.placeholderText}>
          {translate('ui.elements.imagePlaceholder')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const ImageItem: () => React$Node = ({ source, onPress, onLongPress }) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    onLongPress={onLongPress}>
    <Image
      source={source}
      resizeMode="contain"
      style={styles.uiImagePlaceholderImage}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  groupContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: -3,
  },
  lastRowFiller: {
    flex: 1,
  },
  uiImagePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: vw(21),
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  uiImagePlaceholderActionable: {
    backgroundColor: colors.blue,
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
  uiImagePlaceholderImage: {
    height: vw(21),
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
})

const uiImagePlaceholderStyle = styles.uiImagePlaceholder
const uiImagePlaceholderActionableStyle = StyleSheet.compose(
  uiImagePlaceholderStyle,
  styles.uiImagePlaceholderActionable,
)

UIImagePlaceholder.Group = Group
UIImagePlaceholder.Item = Item
UIImagePlaceholder.ImageItem = ImageItem

export default UIImagePlaceholder
