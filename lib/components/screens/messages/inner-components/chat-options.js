/**
 * @format
 * @flow
 */

import { Alert, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Chat from 'model/chat'
import { UIDropdown } from 'ui-elements'
import { MoreOptions } from 'images/components/icons'
import { prepareReportMessage } from 'utils/functions'
import {
  CONVERSATION_DELETE_CONVERSATION,
  CONVERSATION_REPORT_CONVERSATION,
  CONVERSATION_VIEW_LITTEN,
  CONVERSATION_VIEW_PROFILE,
  FEEDBACK_TYPE_ABUSE,
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  SCREEN_LITTEN_POST,
  SCREEN_PROFILE_REPORT,
  SCREEN_TAB_NAV_PROFILE,
  SCREEN_USER_PROFILE,
  UI_EXTRA_OPTION_SIZE,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const ChatOptions: (args: any) => React$Node = ({
  chat,
  litten,
  recipient,
  user,
}) => {
  const navigation = useNavigation()

  const littenExists = !!litten.id

  const deleteConversation = async () => {
    const thisChat = new Chat(chat)
    await thisChat.deleteForUser(user.id)
    navigation.goBack()
  }

  const confirmDeleteConversation = () => {
    Alert.alert(
      translate('cta.deleteConversation'),
      translate('feedback.confirmMessages.deleteConversation', {
        user: recipient.displayName,
      }),
      [
        {
          text: translate('cta.yes'),
          onPress: deleteConversation,
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }

  const conversationOptions = [
    {
      key: CONVERSATION_VIEW_LITTEN,
      label: translate('screens.messages.options.viewLitten'),
      value: CONVERSATION_VIEW_LITTEN,
      onSelect: () =>
        navigation.navigate(SCREEN_LITTEN_POST, {
          litten,
          user: litten.userUid === recipient.id ? recipient : user,
        }),
      disabled: !littenExists,
    },
    {
      key: CONVERSATION_VIEW_PROFILE,
      label: translate('screens.messages.options.viewProfile'),
      value: CONVERSATION_VIEW_PROFILE,
      onSelect: () =>
        navigation.navigate(SCREEN_USER_PROFILE, {
          user: recipient,
        }),
      disabled: !recipient.id,
    },
    {
      key: 'separator',
      separator: true,
    },
    {
      key: CONVERSATION_REPORT_CONVERSATION,
      label: translate('screens.messages.options.reportConversation'),
      value: CONVERSATION_REPORT_CONVERSATION,
      onSelect: () =>
        navigation.navigate(SCREEN_TAB_NAV_PROFILE, {
          screen: SCREEN_PROFILE_REPORT,
          params: {
            type: FEEDBACK_TYPE_ABUSE,
            initialContent: prepareReportMessage(chat, user),
          },
          initial: false,
        }),
      disabled: !chat,
    },
    {
      key: CONVERSATION_DELETE_CONVERSATION,
      label: translate('screens.messages.options.deleteConversation'),
      value: CONVERSATION_DELETE_CONVERSATION,
      onSelect: confirmDeleteConversation,
      disabled: !chat,
    },
  ]

  return (
    <UIDropdown
      placement="bottom"
      options={conversationOptions}
      menuTrigger={
        <View style={styles.menuTriggerContainer}>
          <MoreOptions
            height={UI_EXTRA_OPTION_SIZE}
            width={UI_EXTRA_OPTION_SIZE}
            fill={colors.white}
          />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  menuTriggerContainer: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '100%',
    width: '100%',
  },
})

export default ChatOptions
