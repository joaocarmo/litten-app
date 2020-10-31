/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import UIImage from './image'
import colors from 'styles/colors'
import {
  elevated as elevatedStyle,
  veryElevated as veryElevatedStyle,
} from 'styles/common'
import {
  UI_ICON_SIZE_MEDIUM,
  UI_ICON_SIZE_SMALL,
  UI_ICON_SIZE_MINI,
} from 'utils/constants'

const UIText: (args: any) => React$Node = ({
  circle = false,
  icon,
  iconStyle,
  selected = false,
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
          elevation: elevatedStyle,
        }
      case 'mini':
        return {
          main: styles.uiIconContainerMainMini,
          circle: styles.uiIconContainerCircleMini,
          elevation: elevatedStyle,
        }
      default:
        return {
          main: styles.uiIconContainerMainSmall,
          circle: styles.uiIconContainerCircleSmall,
          elevation: veryElevatedStyle,
        }
    }
  }

  const sizeStyle = getSizeStyle()
  const elevationStyle = sizeStyle.elevation
  const mainSelected = selected ? styles.uiIconContainerMainSelected : undefined
  const iconSelected = selected ? styles.uiIconSelected : undefined

  return (
    <View
      {...otherProps}
      style={[
        styles.uiIconContainer,
        sizeStyle.main,
        circle ? sizeStyle.circle : undefined,
        elevationStyle,
        mainSelected,
        style,
      ]}>
      {icon && (
        <UIImage
          source={icon}
          style={[styles.uiIcon, iconSelected, iconStyle]}
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
  uiIconContainerMainSelected: {
    backgroundColor: colors.blue,
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
    padding: UI_ICON_SIZE_SMALL / 4,
  },
  uiIconContainerCircleSmall: {
    borderRadius: UI_ICON_SIZE_SMALL / 2,
  },
  uiIconContainerMainMini: {
    height: UI_ICON_SIZE_MINI,
    padding: UI_ICON_SIZE_MINI / 4,
  },
  uiIconContainerCircleMini: {
    borderRadius: UI_ICON_SIZE_MINI / 2,
  },
  uiIcon: {
    height: '100%',
    width: '100%',
  },
  uiIconSelected: {
    tintColor: colors.white,
  },
})

export default UIText
