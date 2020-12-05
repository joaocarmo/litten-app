/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TabNavigationItem from 'structure/tab-navigation-item'
import {
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
} from 'utils/constants'
import colors from 'styles/colors'

const TabNavigation: (args: any) => React$Node = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[
        styles.container,
        { height: STRUCTURE_TAB_NAV_HEIGHT + insets.bottom },
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabNavigationItem
            key={route.key}
            options={options}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    height: STRUCTURE_TAB_NAV_HEIGHT,
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    backgroundColor: colors.white,
  },
})

export default TabNavigation
