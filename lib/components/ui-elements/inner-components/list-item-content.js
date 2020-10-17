/**
 * @format
 * @flow
 */

import { Image, StyleSheet, Text, View } from 'react-native'
import UIListItemContentMain from './list-item-content-main'
import { iconChevron } from 'images'
import colors from 'styles/colors'

const iconSize = 26

const UIListItemContent: (args: any) => React$Node = ({
  badgeActive = false,
  badgeNum = null,
  children,
  hasExtra = false,
  icon,
  selected = false,
  style,
  ...otherProps
}) => (
  <View
    style={StyleSheet.compose(
      selected ? uiListItemContainerSelectedStyle : uiListItemContainerStyle,
      style,
    )}>
    <View style={styles.uiListItemContentContainer}>
      {icon && (
        <Image
          source={icon}
          resizeMode="contain"
          style={selected ? uiListItemIconSelectedStyle : styles.uiListItemIcon}
        />
      )}
      <UIListItemContentMain selected={selected} {...otherProps}>
        {children}
      </UIListItemContentMain>
    </View>
    <View style={styles.uiListItemExtra}>
      {typeof badgeNum === 'number' && (
        <View style={styles.uiListItemExtraBadge}>
          <Text
            style={
              badgeActive
                ? StyleSheet.compose(
                    styles.uiListItemExtraBadgeText,
                    styles.uiListItemExtraBadgeTextActive,
                  )
                : styles.uiListItemExtraBadgeText
            }>{`${badgeNum}`}</Text>
        </View>
      )}
      {hasExtra && (
        <Image
          source={iconChevron}
          style={styles.iconChevron}
          resizeMode="contain"
        />
      )}
    </View>
  </View>
)

const styles = StyleSheet.create({
  uiListItemCommon: {
    flex: 1,
    minHeight: 64,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  uiListItemCommonSelected: {
    backgroundColor: colors.blue,
  },
  uiListItemContainer: {
    display: 'flex',
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
  uiListItemIcon: {
    height: iconSize,
    width: iconSize,
    marginRight: 16,
  },
  uiListItemIconSelected: {
    tintColor: colors.white,
  },
  uiListItemExtra: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiListItemExtraBadge: {
    display: 'flex',
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
    fontWeight: '600',
  },
  uiListItemExtraBadgeTextActive: {
    color: colors.blue,
  },
  iconChevron: {
    maxHeight: 12,
    maxWidth: 12,
  },
})

const uiListItemContainerStyle = StyleSheet.compose(
  styles.uiListItemCommon,
  styles.uiListItemContainer,
)

const uiListItemContainerSelectedStyle = StyleSheet.compose(
  uiListItemContainerStyle,
  styles.uiListItemCommonSelected,
)

const uiListItemIconSelectedStyle = StyleSheet.compose(
  styles.uiListItemIcon,
  styles.uiListItemIconSelected,
)

export default UIListItemContent
