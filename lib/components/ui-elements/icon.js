/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import colors from 'styles/colors'
import { elevated as elevatedStyle } from 'styles/common'
import { UI_ICON_SIZE_SMALL } from 'utils/constants'

const UIText: (args: any) => React$Node = ({
  circle = false,
  elevated = false,
  icon,
  iconStyle,
  style,
  ...otherProps
}) => (
  <View
    {...otherProps}
    style={[
      StyleSheet.compose(styles.uiIconContainer, style),
      circle ? styles.uiIconContainerCircle : undefined,
      elevated ? elevatedStyle : undefined,
    ]}>
    {icon && (
      <Image
        source={icon}
        resizeMode="contain"
        style={StyleSheet.compose(styles.uiIcon, iconStyle)}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  uiIconContainer: {
    height: UI_ICON_SIZE_SMALL,
    aspectRatio: 1,
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.white,
  },
  uiIconContainerCircle: {
    borderRadius: UI_ICON_SIZE_SMALL / 2,
  },
  uiIcon: {
    height: '100%',
    width: '100%',
  },
})

export default UIText
