/**
 * @format
 * @flow
 */

import { Send as GFSend } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'

const Send: (args: any) => React$Node = (props) => (
  <GFSend label={translate('cta.send')} {...props} />
)

export default Send
