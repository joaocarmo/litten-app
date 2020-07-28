/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import colors from 'styles/colors'

const iconSize = 28
const activeSize = 6

const TabNavigationItem: () => React$Node = ({
  isFocused,
  onLongPress,
  onPress,
  options: { tabBarIcon } = {},
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.iconContainer}>
    <View style={styles.iconBox}>
      <Image
        source={tabBarIcon}
        style={isFocused ? activeIcon : styles.icon}
        resizeMode="contain"
      />
      <View style={isFocused ? activeIndicator : styles.indicator} />
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  icon: {
    height: iconSize,
    width: iconSize,
  },
  iconActive: {
    tintColor: colors.blue,
  },
  indicator: {
    height: activeSize,
    width: activeSize,
    borderRadius: activeSize / 2,
    marginTop: 8,
    backgroundColor: colors.white,
  },
  indicatorActive: {
    backgroundColor: colors.blue,
  },
})

const activeIcon = StyleSheet.compose(styles.icon, styles.iconActive)
const activeIndicator = StyleSheet.compose(
  styles.indicator,
  styles.indicatorActive,
)

export default TabNavigationItem
