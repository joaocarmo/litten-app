/**
 * @format
 * @flow
 */

import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const UserProfileScreen: (args: any) => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.profile.view')}
      </ScreenSimpleHeaderTemplate>
    }>
    <UIText>{route?.params?.user?.displayName}</UIText>
  </ScreenTemplate>
)

export default UserProfileScreen
