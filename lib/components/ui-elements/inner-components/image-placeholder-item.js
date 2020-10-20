/**
 * @format
 * @flow
 */

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import UIImage from '../image'
import { iconCamera } from 'images'
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
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View
        {...otherProps}
        style={StyleSheet.compose(uiImagePlaceholderActionableStyle, style)}>
        <UIImage source={iconCamera} style={styles.placeholderIcon} />
        <Text style={styles.placeholderText}>
          {translate('ui.elements.imagePlaceholder')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  uiImagePlaceholderCommon: {
    height: vw(21),
    aspectRatio: 1,
    margin: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lighterGray,
  },
  uiImagePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
