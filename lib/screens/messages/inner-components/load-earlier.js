/**
 * @format
 * @flow
 */

import { LoadEarlier as GFLoadEarlier } from 'react-native-gifted-chat'
import { translate } from 'utils/i18n'

const LoadEarlier: (args: any) => React$Node = (props) => (
  <GFLoadEarlier {...props} label={translate('screens.messages.loadEarlier')} />
)

export default LoadEarlier
