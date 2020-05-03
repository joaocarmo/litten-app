/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { iconChevron } from 'images'
import colors from 'styles/colors'

const UIListItemContent: () => React$Node = ({
  children,
  style,
  hasExtra = false,
  badgeNum = null,
  badgeActive = false,
  ...otherProps
}) => (
  <View {...otherProps} style={styles.listItemContainer}>
    <Text style={StyleSheet.compose(styles.uiListItemText, style)}>
      {children}
    </Text>
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

const UIListItem: () => React$Node = ({
  children,
  onPress,
  onLongPress,
  ...otherProps
}) => {
  const isClickable =
    typeof onPress === 'function' || typeof onLongPress === 'function'

  if (isClickable) {
    return (
      <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
        <UIListItemContent {...otherProps}>{children}</UIListItemContent>
      </TouchableOpacity>
    )
  }

  return <UIListItemContent {...otherProps}>{children}</UIListItemContent>
}

const styles = StyleSheet.create({
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 52,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  uiListItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.blue,
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

export default UIListItem
