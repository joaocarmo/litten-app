/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import colors from 'styles/colors'
import { elevated as elevatedStyle } from 'styles/common'
import { UI_ICON_SIZE_MEDIUM, UI_ICON_SIZE_SMALL } from 'utils/constants'

const UIText: (args: any) => React$Node = ({
  circle = false,
  elevated = false,
  icon,
  iconStyle,
  size = 'small',
  style,
  ...otherProps
}) => {
  const getSizeStyle = () => {
    switch (size) {
      case 'medium':
        return {
          main: styles.uiIconContainerMainMedium,
          circle: styles.uiIconContainerCircleMedium,
        }
      default:
        return {
          main: styles.uiIconContainerMainSmall,
          circle: styles.uiIconContainerCircleSmall,
        }
    }
  }

  const sizeStyle = getSizeStyle()

  return (
    <View
      {...otherProps}
      style={[
        StyleSheet.compose(styles.uiIconContainer, style),
        sizeStyle.main,
        circle ? sizeStyle.circle : undefined,
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
}

const styles = StyleSheet.create({
  uiIconContainer: {
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  uiIconContainerMainMedium: {
    height: UI_ICON_SIZE_MEDIUM,
    padding: UI_ICON_SIZE_MEDIUM / 4,
  },
  uiIconContainerCircleMedium: {
    borderRadius: UI_ICON_SIZE_MEDIUM / 2,
  },
  uiIconContainerMainSmall: {
    height: UI_ICON_SIZE_SMALL,
    padding: UI_ICON_SIZE_SMALL / 5,
  },
  uiIconContainerCircleSmall: {
    borderRadius: UI_ICON_SIZE_SMALL / 2,
  },
  uiIcon: {
    height: '100%',
    width: '100%',
  },
})

export default UIText
