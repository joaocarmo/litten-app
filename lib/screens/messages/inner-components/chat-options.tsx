import { useCallback, useMemo } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useCurrentlyActiveChat, useTheme } from '@hooks'
import Chat from '@model/chat'
import { UIDropdown } from '@ui-elements'
import { MoreOptions } from '@images/components/icons'
import { prepareReportMessage } from '@utils/functions'
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
  SCREEN_PROFILE_VIEW,
  UI_DROPDOWN_MARGIN,
  UI_EXTRA_OPTION_SIZE,
} from '@utils/constants'
import { translate } from '@utils/i18n'

const ChatOptions = ({ chat = {}, litten = {}, recipient = {}, user = {} }) => {
  const navigation = useNavigation()
  const [currentlyActiveChat] = useCurrentlyActiveChat()
  const {
    theme: { colors },
  } = useTheme()

  const chatUid = useMemo(
    () => chat.id || currentlyActiveChat,
    [chat.id, currentlyActiveChat],
  )

  const chatExists = useMemo(() => !!chatUid, [chatUid])

  const littenExists = useMemo(() => !!litten.id, [litten.id])

  const recipientExists = useMemo(
    () => !!(recipient.id && recipient.displayName),
    [recipient.displayName, recipient.id],
  )

  const deleteConversation = useCallback(async () => {
    const thisChat = new Chat({
      id: chatUid,
    })
    await thisChat.deleteForUser(user.id)
    navigation.goBack()
  }, [chatUid, navigation, user.id])

  const confirmDeleteConversation = useCallback(() => {
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
  }, [deleteConversation, recipient.displayName])

  const conversationOptions = useMemo(
    () => [
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
          navigation.navigate(SCREEN_PROFILE_VIEW, {
            user: recipient,
          }),
        disabled: !recipientExists,
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
              initialContent: prepareReportMessage(
                {
                  id: chatUid,
                },
                recipient,
              ),
            },
            initial: false,
          }),
        disabled: !chatExists,
      },
      {
        key: CONVERSATION_DELETE_CONVERSATION,
        label: translate('screens.messages.options.deleteConversation'),
        value: CONVERSATION_DELETE_CONVERSATION,
        onSelect: confirmDeleteConversation,
        disabled: !chatExists,
      },
    ],
    [
      chatExists,
      chatUid,
      confirmDeleteConversation,
      litten,
      littenExists,
      navigation,
      recipient,
      recipientExists,
      user,
    ],
  )

  return (
    <UIDropdown
      placement="bottom"
      options={conversationOptions}
      menuTrigger={
        <View style={styles.menuTriggerContainer}>
          <MoreOptions
            height={UI_EXTRA_OPTION_SIZE}
            width={UI_EXTRA_OPTION_SIZE}
            fill={colors.textAlt}
          />
        </View>
      }
      style={styles.menuContainer}
    />
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  menuTriggerContainer: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: UI_DROPDOWN_MARGIN,
  },
})

export default ChatOptions
