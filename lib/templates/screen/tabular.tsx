import { createStackNavigator } from '@react-navigation/stack'
import type { Tab } from '@templates/types'
import type { TabularStackParamList } from '@utils/types/routes'

const ScreenTabStack = createStackNavigator<TabularStackParamList>()

export type ScreenTabularProps = {
  tabs?: Tab[]
}

const ScreenTabular = ({ tabs }: ScreenTabularProps) => (
  <ScreenTabStack.Navigator
    screenOptions={{
      animationEnabled: false,
      headerShown: false,
    }}
  >
    {tabs.length > 0 &&
      tabs.map(({ key, name, compoundComponent }) => (
        <ScreenTabStack.Screen
          name={name}
          component={compoundComponent}
          key={key}
        />
      ))}
  </ScreenTabStack.Navigator>
)

ScreenTabular.defaultProps = {
  tabs: [],
}

export default ScreenTabular
