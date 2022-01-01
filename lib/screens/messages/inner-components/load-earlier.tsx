import { LoadEarlier as GFLoadEarlier } from 'react-native-gifted-chat'
import { translate } from '@utils/i18n'

const LoadEarlier = (props) => (
  <GFLoadEarlier {...props} label={translate('screens.messages.loadEarlier')} />
)

export default LoadEarlier
