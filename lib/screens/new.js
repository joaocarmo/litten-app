/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FormNew from 'forms/new'
import { translate } from 'utils/i18n'

const NewScreen: (args: any) => Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.new.title')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable>
    <FormNew />
  </ScreenTemplate>
)

export default NewScreen
