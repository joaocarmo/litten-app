/**
 * @format
 * @flow
 */

import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './welcome'
import Register from './register'
import Login from './login'
import Recover from './recover'
import {
  SCREEN_NOAUTH_WELCOME,
  SCREEN_NOAUTH_REGISTER,
  SCREEN_NOAUTH_LOGIN,
  SCREEN_NOAUTH_RECOVER,
} from 'utils/constants'

const Stack = createStackNavigator()

const Onboard: () => React$Node = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={SCREEN_NOAUTH_WELCOME} component={Welcome} />
    <Stack.Screen name={SCREEN_NOAUTH_REGISTER} component={Register} />
    <Stack.Screen name={SCREEN_NOAUTH_LOGIN} component={Login} />
    <Stack.Screen name={SCREEN_NOAUTH_RECOVER} component={Recover} />
  </Stack.Navigator>
)

export default Onboard
