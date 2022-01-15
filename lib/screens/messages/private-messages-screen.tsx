import { useTheme } from '@hooks'
import ScreenTemplate from '@templates/screen'
import MessagePrivateHeader from '@screens/messages/private-messages-screen-header'
import PrivateMessages from '@screens/messages/private-messages'
import { translate } from '@utils/i18n'
import { MessagePrivateScreenProps } from '@utils/types/routes'

const MessagePrivateScreen = ({
  route: {
    params: { chat, recipient, litten },
  },
}: MessagePrivateScreenProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    messagesContainer: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
  }))

  return (
    <ScreenTemplate
      header={
        <MessagePrivateHeader
          chat={chat}
          litten={litten}
          recipient={recipient}
        />
      }
      style={styles.messagesContainer}
    >
      <PrivateMessages chat={chat} litten={litten} recipient={recipient} />
    </ScreenTemplate>
  )
}

MessagePrivateScreen.defaultProps = {
  route: {
    params: {
      chat: null,
      recipient: {
        id: 0,
        displayName: translate('ui.placeholders.user'),
      },
      litten: null,
      read: null,
    },
  },
}

export default MessagePrivateScreen
