/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormNew from 'forms/new'
import FormNewLocation from 'forms/new/location'
import { translate } from 'utils/i18n'
import { SCREEN_NEW_INDEX, SCREEN_NEW_LOCATION } from 'utils/constants'

const NewStack = createStackNavigator()

const NewIndex: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.new.title')}
      </ScreenSimpleHeaderTemplate>
    }>
    <FormNew />
  </ScreenTemplate>
)

const NewLocation: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.new.addLocation')}
      </ScreenSimpleHeaderTemplate>
    }>
    <FormNewLocation />
  </ScreenTemplate>
)

const NewScreen: () => React$Node = () => (
  <NewStack.Navigator screenOptions={{ headerShown: false }}>
    <NewStack.Screen name={SCREEN_NEW_INDEX} component={NewIndex} />
    <NewStack.Screen name={SCREEN_NEW_LOCATION} component={NewLocation} />
  </NewStack.Navigator>
)

export default NewScreen
