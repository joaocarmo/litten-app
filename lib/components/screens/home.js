/**
 * @format
 * @flow
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import Home from 'screens/home/index'
import Filter from 'screens/home/filter'
import { translate } from 'utils/i18n'
import { SCREEN_HOME_INDEX, SCREEN_HOME_FILTER } from 'utils/constants'

const HomeStack = createStackNavigator()

const HomeFilter: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.searches.filters')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable={false}>
    <Filter />
  </ScreenTemplate>
)

const HomeScreen: () => React$Node = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name={SCREEN_HOME_INDEX} component={Home} />
    <HomeStack.Screen name={SCREEN_HOME_FILTER} component={HomeFilter} />
  </HomeStack.Navigator>
)

export default HomeScreen
