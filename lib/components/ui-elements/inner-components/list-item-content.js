/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { iconChevron } from 'images'
import colors from 'styles/colors'

const UIListItemContent: (args: any) => React$Node = ({
  badgeActive = false,
  badgeNum = null,
  children,
  hasExtra = false,
  selected = false,
  style,
  ...otherProps
}) => (
  <View
    {...otherProps}
    style={
      selected ? uiListItemContainerSelectedStyle : uiListItemContainerStyle
    }>
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
  uiListItemText: {
    fontSize: 12,
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

const uiListItemTextSelectedStyle = StyleSheet.compose(
  styles.uiListItemText,
  styles.uiListItemTextSelected,
)

export default UIListItemContent
