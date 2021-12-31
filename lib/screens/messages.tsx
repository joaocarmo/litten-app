import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import ActiveMessages from 'screens/messages/active-messages'
import { translate } from 'utils/i18n'

const MessagesScreen = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.messages.title')}
      </ScreenSimpleHeaderTemplate>
    }
  >
    <ActiveMessages />
  </ScreenTemplate>
)

export default MessagesScreen
