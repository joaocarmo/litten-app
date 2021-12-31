import { memo, useCallback, useMemo } from 'react'
import type { ComponentType, Node } from 'react'
import { View } from 'react-native'
import { useTheme } from 'hooks'
import UIImage from 'ui-elements/image'
import {
  UI_ICON_SIZE_MEDIUM,
  UI_ICON_SIZE_SMALL,
  UI_ICON_SIZE_MINI,
} from 'utils/constants'
type UIIconProps = {
  circle: boolean
  icon:
    | string
    | {
        uri: string
      }
  IconComponent: ComponentType<any>
  iconStyle: any
  selected: boolean
  size: 'mini' | 'small' | 'medium'
  style: any
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.icon === nextProps.icon &&
    prevProps.IconComponent === nextProps.IconComponent
  )
}

const UIIcon: (props: UIIconProps) => Node = ({
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
  const styles = createStyles((theme) => ({
    uiIconContainer: {
      aspectRatio: 1,
      borderRadius: 4,
      backgroundColor: theme.colors.background,
    },
    uiIconContainerMainSelected: {
      backgroundColor: theme.colors.secondary,
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
      tintColor: theme.colors.secondary,
    },
    uiIconSelected: {
      tintColor: theme.colors.background,
    },
  }))
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
      } as any)}
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

export default memo<UIIconProps>(UIIcon, areEqual) as React$AbstractComponent<
  UIIconProps,
  unknown
>
