import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '@components/welcome'
import Register from '@components/welcome/register'
import Login from '@components/welcome/login'
import Recover from '@components/welcome/recover'
import { Routes } from '@utils/constants'
import type { OnboardStackParamList } from '@utils/types/routes'

const stackScreens = [
  {
    key: Routes.SCREEN_NOAUTH_WELCOME,
    name: Routes.SCREEN_NOAUTH_WELCOME,
    component: Welcome,
  },
  {
    key: Routes.SCREEN_NOAUTH_REGISTER,
    name: Routes.SCREEN_NOAUTH_REGISTER,
    component: Register,
  },
  {
    key: Routes.SCREEN_NOAUTH_LOGIN,
    name: Routes.SCREEN_NOAUTH_LOGIN,
    component: Login,
  },
  {
    key: Routes.SCREEN_NOAUTH_RECOVER,
    name: Routes.SCREEN_NOAUTH_RECOVER,
    component: Recover,
  },
] as const

const Stack = createStackNavigator<OnboardStackParamList>()

const Onboard = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {stackScreens.map(({ key, name, component }) => (
      <Stack.Screen key={key} name={name} component={component} />
    ))}
  </Stack.Navigator>
)

export default Onboard
