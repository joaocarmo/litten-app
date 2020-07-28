/**
 * @format
 * @flow
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import type { ScreenTabularTab } from 'templates/screen/types/tabular'

const ScreenTabStack = createStackNavigator()

const ScreenTabular: () => React$Node = (
  {
    tabs,
  }: {
    tabs?: ScreenTabularTab[],
  } = { tabs: [] },
) => (
  <ScreenTabStack.Navigator
    screenOptions={{ animationEnabled: false, headerShown: false }}>
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
