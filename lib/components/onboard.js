/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './welcome'
import Register from './register'
import Login from './login'

const Stack = createStackNavigator()

const Onboard: () => React$Node = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
)

export default Onboard
