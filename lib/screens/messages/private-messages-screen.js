/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import ScreenTemplate from 'templates/screen'
import MessagePrivateHeader from 'screens/messages/private-messages-screen-header'
import PrivateMessages from 'screens/messages/private-messages'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import type { Dispatch, State } from 'store/types/state'
import type { BasicUser } from 'model/types/user'

type OwnProps = {}
type StateProps = {|
  +user: BasicUser,
|}
type DispatchProps = null
type PrivateMessagesProps = {
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
}

const mapStateToProps = (state: State): StateProps => ({
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = null

const MessagePrivateScreen: (args: any) => React$Node = ({
  route: {
    params: {
      chat,
      recipient = {
        id: 0,
        displayName: translate('ui.placeholders.user'),
      },
      litten,
    },
  },
  user,
}) => (
  <ScreenTemplate
    header={
      <MessagePrivateHeader
        chat={chat}
        litten={litten}
        recipient={recipient}
        user={user}
      />
    }
    behavior={null}
    style={styles.messagesContainer}>
    <PrivateMessages
      chat={chat}
      litten={litten}
      recipient={recipient}
      user={user}
    />
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default connect<
  PrivateMessagesProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(MessagePrivateScreen)
