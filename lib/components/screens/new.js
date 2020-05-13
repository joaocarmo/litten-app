/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import NewMainScreen from 'screens/new/main'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { translate } from 'utils/i18n'

const NewScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.new.title')}
      </ScreenSimpleHeaderTemplate>
    }>
    <NewMainScreen />
  </ScreenTemplate>
)

export default NewScreen
