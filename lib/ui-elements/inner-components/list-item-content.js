/**
 * @format
 * @flow
 */

import { memo, useCallback, useMemo, type ComponentType } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import UIListItemContentMain from 'ui-elements/inner-components/list-item-content-main'
import UIImage from 'ui-elements/image'
import { Right as RightArrow } from 'images/components/arrows'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_BORDER_RADIUS,
  UI_ELEMENT_LIST_HEIGHT,
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
} from 'utils/constants'
import colors from 'styles/colors'

const ICON_MARGIN = 16

type UIListItemContentProps = {
  badgeActive?: boolean,
  badgeNum?: number | null,
  caption?: string,
  children?: React$Node,
  hasExtra?: boolean,
  icon?: string | { uri: string },
  IconComponent?: ComponentType<any>,
  iconPosition?: 'left' | 'right',
  isPressed?: boolean,
  noFeedback?: boolean,
  onPressIcon?: (args: any) => void,
  selected?: boolean,
  style?: any,
  ...
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.badgeActive === nextProps.badgeActive &&
    prevProps.badgeNum === nextProps.badgeNum &&
    prevProps.caption === nextProps.caption &&
    prevProps.children === nextProps.children &&
    prevProps.hasExtra === nextProps.hasExtra &&
    prevProps.iconPosition === nextProps.iconPosition &&
    prevProps.isPressed === nextProps.isPressed &&
    prevProps.noFeedback === nextProps.noFeedback &&
    prevProps.selected === nextProps.selected
  )
}

const UIListItemContent: (props: UIListItemContentProps) => React$Node = ({
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
}) => {
  const leftIcon = useMemo(() => iconPosition === 'left', [iconPosition])
  const isIconPressable = useMemo(() => typeof onPressIcon === 'function', [
    onPressIcon,
  ])

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
      const leftFillColor = selected ? colors.white : colors.blue
      const iconSize = leftIcon ? UI_ICON_SIZE_MINI : UI_ICON_SIZE_MICRO
      iconElement = (
        <IconComponent
          height={iconSize}
          width={iconSize}
          fill={leftIcon ? leftFillColor : colors.darkerGray}
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
  }, [IconComponent, icon, isIconPressable, leftIcon, onPressIcon, selected])

  return (
    <View
      style={[
        styles.uiListItemCommon,
        styles.uiListItemContainer,
        style,
        selected ? styles.uiListItemCommonSelected : undefined,
        isPressed && !noFeedback ? styles.uiListItemCommonPressed : undefined,
      ]}>
      <View style={styles.uiListItemContentContainer}>
        {leftIcon && renderIcon()}
        <UIListItemContentMain
          {...{ ...otherProps, isPressed, noFeedback, selected }}>
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
              ]}>{`${badgeNum}`}</Text>
          </View>
        )}
        {hasExtra && (
          <RightArrow
            height={UI_ICON_SIZE_MICRO}
            width={UI_ICON_SIZE_MICRO}
            fill={colors.darkerGray}
          />
        )}
        {!hasExtra && !leftIcon && renderIcon()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  uiListItemCommon: {
    flex: 1,
    minHeight: UI_ELEMENT_LIST_HEIGHT,
    borderRadius: UI_ELEMENT_BORDER_RADIUS,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: UI_ELEMENT_BORDER_MARGIN,
    marginBottom: UI_ELEMENT_BORDER_MARGIN,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  uiListItemCommonSelected: {
    backgroundColor: colors.blue,
  },
  uiListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uiListItemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uiListItemIconPressable: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    marginRight: -ICON_MARGIN,
  },
  uiListItemIcon: {
    maxHeight: UI_ICON_SIZE_MINI,
    maxWidth: UI_ICON_SIZE_MINI,
    marginRight: ICON_MARGIN,
  },
  uiListItemIconSelected: {
    tintColor: colors.white,
  },
  uiListItemCommonPressed: {
    backgroundColor: colors.lighterBlue,
  },
  uiListItemExtra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiListItemExtraBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    minWidth: 20,
    borderRadius: 8,
    padding: 4,
    marginRight: 4,
    backgroundColor: colors.lightGray,
  },
  uiListItemExtraBadgeText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '700',
  },
  uiListItemExtraBadgeTextActive: {
    color: colors.blue,
  },
})

export default (memo<UIListItemContentProps>(
  UIListItemContent,
  areEqual,
): React$AbstractComponent<UIListItemContentProps, mixed>)
