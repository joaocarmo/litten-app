import { memo, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { PressableProps } from 'react-native'
import { useTheme } from '@hooks'
import UIListItemContentMain from '@ui-elements/inner-components/list-item-content-main'
import type { UIListItemContentMainProps } from '@ui-elements/inner-components/list-item-content-main'
import UIImage from '@ui-elements/image'
import { Right as RightArrow } from '@images/components/arrows'
import { UI_ICON_SIZE_MICRO, UI_ICON_SIZE_MINI } from '@utils/constants'
import listItemContentStyles from '@ui-elements/inner-components/list-item-content.styles'

export type UIListItemContentProps = {
  badgeActive?: boolean
  badgeNum?: number | null
  hasExtra?: boolean
  icon?: string | { uri: string }
  IconComponent?: ReactNode
  iconPosition?: 'left' | 'right'
  onPressIcon: PressableProps['onPress']
} & UIListItemContentMainProps

const areEqual = (prevProps, nextProps) =>
  prevProps.badgeActive === nextProps.badgeActive &&
  prevProps.badgeNum === nextProps.badgeNum &&
  prevProps.caption === nextProps.caption &&
  prevProps.children === nextProps.children &&
  prevProps.hasExtra === nextProps.hasExtra &&
  prevProps.iconPosition === nextProps.iconPosition &&
  prevProps.isPressed === nextProps.isPressed &&
  prevProps.noFeedback === nextProps.noFeedback &&
  prevProps.selected === nextProps.selected

const UIListItemContent = ({
  badgeActive = false,
  badgeNum = null,
  children,
  hasExtra = false,
  icon,
  IconComponent,
  iconPosition = 'left',
  isPressed = false,
  noFeedback = false,
  onPressIcon,
  selected = false,
  style,
  ...otherProps
}: UIListItemContentProps) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles(listItemContentStyles)

  const leftIcon = useMemo(() => iconPosition === 'left', [iconPosition])
  const isIconPressable = useMemo(
    () => typeof onPressIcon === 'function',
    [onPressIcon],
  )

  const renderIcon = useCallback(() => {
    let iconElement = null

    if (icon) {
      iconElement = (
        <UIImage
          source={icon}
          style={[
            styles.uiListItemIcon,
            selected ? styles.uiListItemIconSelected : undefined,
          ]}
        />
      )
    } else if (IconComponent) {
      const leftFillColor = selected ? colors.textAlt : colors.secondary
      const iconSize = leftIcon ? UI_ICON_SIZE_MINI : UI_ICON_SIZE_MICRO
      iconElement = (
        <IconComponent
          height={iconSize}
          width={iconSize}
          fill={leftIcon ? leftFillColor : colors.neutralDarker}
          style={styles.uiListItemIcon}
        />
      )
    }

    if (isIconPressable) {
      return (
        <Pressable onPress={onPressIcon} style={styles.uiListItemIconPressable}>
          {iconElement}
        </Pressable>
      )
    }

    return iconElement
  }, [
    IconComponent,
    colors.neutralDarker,
    colors.secondary,
    colors.textAlt,
    icon,
    isIconPressable,
    leftIcon,
    onPressIcon,
    selected,
    styles.uiListItemIcon,
    styles.uiListItemIconPressable,
    styles.uiListItemIconSelected,
  ])

  return (
    <View
      style={[
        styles.uiListItemCommon,
        styles.uiListItemContainer,
        style,
        selected ? styles.uiListItemCommonSelected : undefined,
        isPressed && !noFeedback ? styles.uiListItemCommonPressed : undefined,
      ]}
    >
      <View style={styles.uiListItemContentContainer}>
        {leftIcon && renderIcon()}
        <UIListItemContentMain
          {...{ ...otherProps, isPressed, noFeedback, selected }}
        >
          {children}
        </UIListItemContentMain>
      </View>
      <View style={styles.uiListItemExtra}>
        {typeof badgeNum === 'number' && (
          <View style={styles.uiListItemExtraBadge}>
            <Text
              style={[
                styles.uiListItemExtraBadgeText,
                badgeActive ? styles.uiListItemExtraBadgeTextActive : undefined,
              ]}
            >{`${badgeNum}`}</Text>
          </View>
        )}
        {hasExtra && (
          <RightArrow
            height={UI_ICON_SIZE_MICRO}
            width={UI_ICON_SIZE_MICRO}
            fill={colors.neutralDarker}
          />
        )}
        {!hasExtra && !leftIcon && renderIcon()}
      </View>
    </View>
  )
}

UIListItemContent.defaultProps = {
  badgeActive: false,
  badgeNum: null,
  hasExtra: false,
  iconPosition: 'left',
}

export default memo(UIListItemContent, areEqual)
