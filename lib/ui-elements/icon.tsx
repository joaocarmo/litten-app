import { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import type { ImageStyle, ViewProps } from 'react-native'
import { useTheme } from '@hooks'
import UIImage from '@ui-elements/image'
import type { BasicImageSource, IconTypeComponent } from '@ui-elements/types'
import {
  UI_ICON_SIZE_MEDIUM,
  UI_ICON_SIZE_SMALL,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import iconStyles from '@ui-elements/icon.styles'

export type UIIconProps = {
  circle?: boolean
  icon?: BasicImageSource
  IconComponent?: IconTypeComponent
  iconStyle?: ImageStyle
  selected?: boolean
  size?: 'mini' | 'small' | 'medium'
} & ViewProps

const UIIcon = ({
  circle,
  icon,
  IconComponent,
  iconStyle,
  selected,
  size,
  style,
  ...otherProps
}: UIIconProps) => {
  const {
    createStyles,
    theme: { colors },
    commonStyles: {
      commonStyles: {
        elevated: elevatedStyle,
        veryElevated: veryElevatedStyle,
      },
    },
  } = useTheme()

  const styles = createStyles(iconStyles)

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
  }, [
    elevatedStyle,
    size,
    styles.uiIconContainerCircleMedium,
    styles.uiIconContainerCircleMini,
    styles.uiIconContainerCircleSmall,
    styles.uiIconContainerMainMedium,
    styles.uiIconContainerMainMini,
    styles.uiIconContainerMainSmall,
    veryElevatedStyle,
  ])

  const sizeStyle = useMemo(() => getSizeStyle(), [getSizeStyle])
  const elevationStyle = useMemo(
    () => sizeStyle.elevation,
    [sizeStyle.elevation],
  )
  const mainSelected = useMemo(
    () => (selected ? styles.uiIconContainerMainSelected : undefined),
    [selected, styles.uiIconContainerMainSelected],
  )
  const iconSelected = useMemo(
    () => (selected ? styles.uiIconSelected : undefined),
    [selected, styles.uiIconSelected],
  )
  const fillColor = useMemo(
    () =>
      iconStyle?.tintColor ?? (selected ? colors.textAlt : colors.secondary),
    [colors.secondary, colors.textAlt, iconStyle?.tintColor, selected],
  )

  return (
    <View
      style={[
        styles.uiIconContainer,
        sizeStyle.main,
        circle ? sizeStyle.circle : undefined,
        elevationStyle,
        mainSelected,
        style,
      ]}
      {...otherProps}
    >
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

UIIcon.defaultProps = {
  circle: false,
  icon: undefined,
  IconComponent: undefined,
  iconStyle: undefined,
  selected: false,
  size: 'small',
}

export default UIIcon
