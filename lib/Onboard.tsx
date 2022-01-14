import { createStackNavigator } from '@react-navigation/stack'
import Welcome from '@components/welcome'
import Register from '@components/welcome/register'
import Login from '@components/welcome/login'
import Recover from '@components/welcome/recover'
import {
  SCREEN_NOAUTH_WELCOME,
  SCREEN_NOAUTH_REGISTER,
  SCREEN_NOAUTH_LOGIN,
  SCREEN_NOAUTH_RECOVER,
} from '@utils/constants'
import type { OnboardStackParamList } from '@utils/types/routes'

const stackScreens = [
  {
    key: SCREEN_NOAUTH_WELCOME,
    name: SCREEN_NOAUTH_WELCOME,
    component: Welcome,
  },
  {
    key: SCREEN_NOAUTH_REGISTER,
    name: SCREEN_NOAUTH_REGISTER,
    component: Register,
  },
  {
    key: SCREEN_NOAUTH_LOGIN,
    name: SCREEN_NOAUTH_LOGIN,
    component: Login,
  },
  {
    key: SCREEN_NOAUTH_RECOVER,
    name: SCREEN_NOAUTH_RECOVER,
    component: Recover,
  },
]

const Stack = createStackNavigator<OnboardStackParamList>()

const Onboard = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {stackScreens.map((props) => (
      <Stack.Screen {...props} />
    ))}
  </Stack.Navigator>
)

export default Onboard
