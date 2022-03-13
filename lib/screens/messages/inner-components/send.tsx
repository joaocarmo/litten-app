import { Send as EZSend } from 'react-native-easy-chat'
import { translate } from '@utils/i18n'

const Send = (props) => <EZSend label={translate('cta.send')} {...props} />

export default Send
