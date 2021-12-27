/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { useTheme } from 'hooks'
import ScreenTemplate from 'templates/screen'
import MessagePrivateHeader from 'screens/messages/private-messages-screen-header'
import PrivateMessages from 'screens/messages/private-messages'
import { translate } from 'utils/i18n'

const MessagePrivateScreen: (args: any) => Node = ({
  route: {
    params: {
      chat,
      recipient = {
        id: 0,
        displayName: translate('ui.placeholders.user'),
      },
      litten,
      read,
    },
  },
}) => {
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
      behavior={null}
      style={styles.messagesContainer}>
      <PrivateMessages
        chat={chat}
        litten={litten}
        recipient={recipient}
        read={read}
      />
    </ScreenTemplate>
  )
}

export default MessagePrivateScreen
