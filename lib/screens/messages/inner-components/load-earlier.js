/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { LoadEarlier as GFLoadEarlier } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'

const LoadEarlier: (args: any) => Node = (props) => (
  <GFLoadEarlier {...props} label={translate('screens.messages.loadEarlier')} />
)

export default LoadEarlier
