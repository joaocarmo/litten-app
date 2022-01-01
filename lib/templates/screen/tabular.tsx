import { createStackNavigator } from '@react-navigation/stack'

const ScreenTabStack = createStackNavigator()

const ScreenTabular = ({ tabs = [] }) => (
  <ScreenTabStack.Navigator
    screenOptions={{
      animationEnabled: false,
      headerShown: false,
    }}
  >
    {tabs &&
      tabs.map(({ key, name, compoundComponent }) => (
        <ScreenTabStack.Screen
          name={name}
          component={compoundComponent}
          key={key}
        />
      ))}
  </ScreenTabStack.Navigator>
)

export default ScreenTabular
