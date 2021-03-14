/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import Home from 'screens/home/index'
import Filter from 'screens/home/filter'
import FilterSet from 'screens/home/filter/set'
import { translate } from 'utils/i18n'
import {
  SCREEN_HOME_INDEX,
  SCREEN_HOME_FILTER,
  SCREEN_HOME_FILTER_SET,
} from 'utils/constants'

const HomeStack = createStackNavigator()

const HomeFilter: (args: any) => Node = (props) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.searches.filters')}
      </ScreenSimpleHeaderTemplate>
    }>
    <Filter {...props} />
  </ScreenTemplate>
)

const HomeFilterSet: (args: any) => Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {route?.params?.title}
      </ScreenSimpleHeaderTemplate>
    }>
    <FilterSet filter={route?.params?.filter} />
  </ScreenTemplate>
)

const HomeScreen: (args: any) => Node = (props) => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name={SCREEN_HOME_INDEX} component={Home} />
    <HomeStack.Screen name={SCREEN_HOME_FILTER} component={HomeFilter} />
    <HomeStack.Screen name={SCREEN_HOME_FILTER_SET} component={HomeFilterSet} />
  </HomeStack.Navigator>
)

export default HomeScreen
