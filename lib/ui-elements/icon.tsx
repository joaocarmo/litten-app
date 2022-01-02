import { useCallback, useMemo } from 'react'
import type { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { useTheme } from '@hooks'
import UIImage from '@ui-elements/image'
import {
  UI_ICON_SIZE_MEDIUM,
  UI_ICON_SIZE_SMALL,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import iconStyles from '@ui-elements/icon.styles'

type UIIconProps = {
  circle: boolean
  icon:
    | string
    | {
        uri: string
      }
  IconComponent: ReactNode
  iconStyle: any
  selected: boolean
  size: 'mini' | 'small' | 'medium'
  style: any
}

const UIIcon: (props: UIIconProps) => FC = ({
  circle = false,
  icon,
  IconComponent,
  iconStyle,
  selected = false,
  size = 'small',
  style,
  ...otherProps
}) => {
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
      {...{
        ...otherProps,
        style: [
          styles.uiIconContainer,
          sizeStyle.main,
          circle ? sizeStyle.circle : undefined,
          elevationStyle,
          mainSelected,
          style,
        ],
      }}
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

export default UIIcon
