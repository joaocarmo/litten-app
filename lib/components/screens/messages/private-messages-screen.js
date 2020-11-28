/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import ScreenTemplate from 'templates/screen'
import MessagePrivateHeader from './private-messages-screen-header'
import PrivateMessages from './private-messages'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const MessagePrivate: (args: any) => React$Node = ({
  route: {
    params: {
      chat,
      recipient = {
        id: 0,
        displayName: translate('ui.placeholders.user'),
      },
      litten,
      userUid,
    },
  },
}) => (
  <ScreenTemplate
    header={
      <MessagePrivateHeader
        chat={chat}
        litten={litten}
        recipient={recipient}
        userUid={userUid}
      />
    }
    behavior={null}
    style={styles.messagesContainer}>
    <PrivateMessages chat={chat} litten={litten} recipient={recipient} />
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default MessagePrivate
