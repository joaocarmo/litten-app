import { LoadEarlier as EZLoadEarlier } from 'react-native-easy-chat'
import { translate } from '@utils/i18n'

const LoadEarlier = (props) => (
  <EZLoadEarlier {...props} label={translate('screens.messages.loadEarlier')} />
)

export default LoadEarlier
