/**
 * @format
 * @flow
 */

import { useMemo } from 'react'
import type { Node } from 'react'
import { Pressable, View } from 'react-native'
import { useTheme } from 'hooks'
import { usePaddingBottom } from 'hooks'
import { UIBadge } from 'ui-elements'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
  STRUCTURE_TAB_NAV_ICON_INDICATOR_DISTANCE,
  STRUCTURE_TAB_NAV_ICON_SIZE,
} from 'utils/constants'

const TabNavigationItem: (args: any) => Node = ({
  isFocused,
  onLongPress,
  onPress,
  options: { tabBarIcon: TabBarIconComponent, tabBarBadge = 0 },
}) => {
  const { insetBottom } = usePaddingBottom()

  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles((theme) => ({
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
      tintColor: theme.colors.neutralDark,
    },
    iconActive: {
      tintColor: theme.colors.secondary,
    },
    indicator: {
      height: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
      width: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE,
      borderRadius: STRUCTURE_TAB_NAV_ACTIVE_INDICATOR_SIZE / 2,
      marginTop: STRUCTURE_TAB_NAV_ICON_INDICATOR_DISTANCE,
      backgroundColor: theme.colors.background,
    },
    indicatorActive: {
      backgroundColor: theme.colors.secondary,
    },
  }))

  const paddingBottom = useMemo(
    () => (insetBottom ? insetBottom / 2 : 0),
    [insetBottom],
  )

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.iconBox, { paddingBottom }]}>
      <UIBadge number={tabBarBadge}>
        <TabBarIconComponent
          width={STRUCTURE_TAB_NAV_ICON_SIZE}
          height={STRUCTURE_TAB_NAV_ICON_SIZE}
          fill={isFocused ? colors.secondary : colors.neutralDark}
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

export default TabNavigationItem
