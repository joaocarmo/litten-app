/**
 * @format
 * @flow
 */

import React from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import ActiveMessages from 'screens/messages/active-messages'
import NoMessagesScreen from 'screens/messages/no-messages'
import { translate } from 'utils/i18n'

const activeConversations = 6

const MessagesScreen: (args: any) => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.messages.title')}
      </ScreenSimpleHeaderTemplate>
    }
    scrollable={false}>
    {activeConversations > 0 ? <ActiveMessages /> : <NoMessagesScreen />}
  </ScreenTemplate>
)

export default MessagesScreen
