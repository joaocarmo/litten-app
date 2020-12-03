/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
  STRUCTURE_TAB_NAV_ICON_INDICATOR_DISTANCE,
  STRUCTURE_TAB_NAV_ICON_SIZE,
} from 'utils/constants'
import colors from 'styles/colors'

const TabNavigationItem: (args: any) => React$Node = ({
  isFocused,
  onLongPress,
  onPress,
  options: { tabBarIcon },
}) => {
  const insets = useSafeAreaInsets()

  const TabBarIconComponent = tabBarIcon

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.iconBox, { paddingBottom: Math.max(insets.bottom, 0) }]}>
      <TabBarIconComponent
        width={STRUCTURE_TAB_NAV_ICON_SIZE}
        height={STRUCTURE_TAB_NAV_ICON_SIZE}
        fill={isFocused ? colors.blue : colors.darkGray}
      />
      <View
        style={[
          styles.indicator,
          isFocused ? styles.indicatorActive : undefined,
        ]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconBox: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  icon: {
    height: STRUCTURE_TAB_NAV_ICON_SIZE,
    width: STRUCTURE_TAB_NAV_ICON_SIZE,
    tintColor: colors.darkGray,
  },
  iconActive: {
    tintColor: colors.blue,
  },
  indicator: {
    height: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
    width: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
    borderRadius: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE / 2,
    marginTop: STRUCTURE_TAB_NAV_ICON_INDICATOR_DISTANCE,
    backgroundColor: colors.white,
  },
  indicatorActive: {
    backgroundColor: colors.blue,
  },
})

export default TabNavigationItem
