/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Send as GFSend } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'

const Send: (args: any) => Node = (props) => (
  <GFSend label={translate('cta.send')} {...props} />
)

export default Send
