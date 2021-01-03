/**
 * @format
 * @flow
 */

import { memo, useCallback, useMemo, type ComponentType } from 'react'
import { StyleSheet, View } from 'react-native'
import UIImage from 'ui-elements/image'
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

type UIIconProps = {
  circle: boolean,
  icon: string | { uri: string },
  IconComponent: ComponentType<any>,
  iconStyle: any,
  selected: boolean,
  size: 'mini' | 'small' | 'medium',
  style: any,
  ...
}

const areEqual = (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected
}

const UIIcon: (props: UIIconProps) => React$Node = ({
  circle = false,
  icon,
  IconComponent,
  iconStyle,
  selected = false,
  size = 'small',
  style,
  ...otherProps
}) => {
  const getSizeStyle = useCallback(() => {
    switch (size) {
      case 'medium':
        return {
          circle: styles.uiIconContainerCircleMedium,
          dimensions: UI_ICON_SIZE_MEDIUM,
          elevation: elevatedStyle,
          main: styles.uiIconContainerMainMedium,
        }
      case 'mini':
        return {
          circle: styles.uiIconContainerCircleMini,
          dimensions: UI_ICON_SIZE_MINI,
          elevation: elevatedStyle,
          main: styles.uiIconContainerMainMini,
        }
      default:
        return {
          circle: styles.uiIconContainerCircleSmall,
          dimensions: UI_ICON_SIZE_SMALL,
          elevation: veryElevatedStyle,
          main: styles.uiIconContainerMainSmall,
        }
    }
  }, [size])

  const sizeStyle = useMemo(() => getSizeStyle(), [getSizeStyle])
  const elevationStyle = useMemo(() => sizeStyle.elevation, [
    sizeStyle.elevation,
  ])
  const mainSelected = useMemo(
    () => (selected ? styles.uiIconContainerMainSelected : undefined),
    [selected],
  )
  const iconSelected = useMemo(
    () => (selected ? styles.uiIconSelected : undefined),
    [selected],
  )
  const fillColor = useMemo(
    () => iconStyle?.tintColor ?? (selected ? colors.white : colors.blue),
    [iconStyle?.tintColor, selected],
  )

  return (
    <View
      {...({
        ...otherProps,
        style: [
          styles.uiIconContainer,
          sizeStyle.main,
          circle ? sizeStyle.circle : undefined,
          elevationStyle,
          mainSelected,
          style,
        ],
      }: any)}>
      {icon && !IconComponent && (
        <UIImage
          source={icon}
          style={[styles.uiIcon, iconSelected, iconStyle]}
        />
      )}
      {!icon && IconComponent && (
        <IconComponent
          height={sizeStyle.dimensions / 2}
          width={sizeStyle.dimensions / 2}
          fill={fillColor}
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
    tintColor: colors.blue,
  },
  uiIconSelected: {
    tintColor: colors.white,
  },
})

export default memo<UIIconProps>(UIIcon, areEqual)
