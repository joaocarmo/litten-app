import { View } from 'react-native'
import { usePaddingBottom, useTheme } from 'hooks'
import TabNavigationItem from 'structure/tab-navigation-item'
import {
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
} from 'utils/constants'

const TabNavigation = ({ state, descriptors, navigation }) => {
  const { insetBottom } = usePaddingBottom()
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    container: {
      flexDirection: 'row',
      position: 'absolute',
      height: STRUCTURE_TAB_NAV_HEIGHT,
      width: '100%',
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingLeft: '2%',
      paddingRight: '2%',
      borderTopLeftRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
      borderTopRightRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
      backgroundColor: theme.colors.background,
    },
  }))
  return (
    <View
      style={[
        styles.container,
        {
          height: STRUCTURE_TAB_NAV_HEIGHT + insetBottom,
        },
      ]}
    >
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

export default TabNavigation
