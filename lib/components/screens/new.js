/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormNew from 'forms/new'
import { translate } from 'utils/i18n'

const NewScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.new.title')}
      </ScreenSimpleHeaderTemplate>
    }>
    <FormNew />
  </ScreenTemplate>
)

export default NewScreen
