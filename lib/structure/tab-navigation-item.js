/**
 * @format
 * @flow
 */

import { useMemo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { usePaddingBottom } from 'hooks'
import { UIBadge } from 'ui-elements'
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
  options: { tabBarIcon: TabBarIconComponent, tabBarBadge = 0 },
}) => {
  const { insetBottom } = usePaddingBottom()

  const paddingBottom = useMemo(() => (insetBottom ? insetBottom / 2 : 0), [
    insetBottom,
  ])

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.iconBox, { paddingBottom }]}>
      <UIBadge number={tabBarBadge}>
        <TabBarIconComponent
          width={STRUCTURE_TAB_NAV_ICON_SIZE}
          height={STRUCTURE_TAB_NAV_ICON_SIZE}
          fill={isFocused ? colors.blue : colors.darkGray}
        />
      </UIBadge>
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
    height: '100%',
    width: '12%',
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
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
