/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet } from 'react-native'
import ScreenTemplate from 'templates/screen'
import MessagePrivateHeader from 'screens/messages/private-messages-screen-header'
import PrivateMessages from 'screens/messages/private-messages'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

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
}) => (
  <ScreenTemplate
    header={
      <MessagePrivateHeader chat={chat} litten={litten} recipient={recipient} />
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

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default MessagePrivateScreen
