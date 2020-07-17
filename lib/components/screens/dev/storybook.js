/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { UIText } from 'ui-elements'
// import StorybookUIRoot from '../../../../storybook'
import { translate } from 'utils/i18n'

const StorybookUI = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.storybook')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable={false}>
    <UIText>{translate('screens.profile.storybookIntro')}</UIText>
    {/*<StorybookUIRoot />*/}
  </ScreenTemplate>
)

export default StorybookUI
