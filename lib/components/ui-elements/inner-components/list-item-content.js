/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
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
    {...otherProps}
    style={
      selected ? uiListItemContainerSelectedStyle : uiListItemContainerStyle
    }>
    <View style={styles.uiListItemContentContainer}>
      {icon && (
        <Image
          source={icon}
          resizeMode="contain"
          style={selected ? uiListItemIconSelectedStyle : styles.uiListItemIcon}
        />
      )}
      {typeof children === 'string' ? (
        <Text
          style={StyleSheet.compose(
            selected ? uiListItemTextSelectedStyle : styles.uiListItemText,
            style,
          )}>
          {children}
        </Text>
      ) : (
        children
      )}
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
  uiListItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    paddingTop: 12,
    paddingBottom: 12,
  },
  uiListItemTextSelected: {
    color: colors.white,
  },
  uiListItemTextInput: {
    textAlignVertical: 'top',
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

const uiListItemTextSelectedStyle = StyleSheet.compose(
  styles.uiListItemText,
  styles.uiListItemTextSelected,
)

export default UIListItemContent
