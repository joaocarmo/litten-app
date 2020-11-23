/**
 * @format
 * @flow
 */

import { Alert, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Chat from 'model/chat'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import PrivateMessages from './private-messages'
import { UIAvatar, UIDropdown, UIImage } from 'ui-elements'
import { iconMoreOptions, placeholderUser } from 'images'
import { getFromListByKey, shortenName } from 'utils/functions'
import {
  CONVERSATION_DELETE_CONVERSATION,
  CONVERSATION_VIEW_LITTEN,
  CONVERSATION_VIEW_PROFILE,
  SCREEN_LITTEN_POST,
  SCREEN_USER_PROFILE,
  UI_EXTRA_OPTION_SIZE,
  USER_AVATAR_SIZE_MINI,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const MessagePrivate: (args: any) => React$Node = ({ route }) => {
  const {
    params: { chat, recipient: recipientExists, litten, userUid },
  } = route
  const recipient = recipientExists ?? {
    id: 0,
    displayName: translate('ui.placeholders.user'),
  }
  const littenExists = !!litten.title
  const species = getFromListByKey(littenSpeciesList, litten.species)
  const type = getFromListByKey(littenTypes, litten.type)
  const subtitle =
    litten?.title && species && type
      ? translate('screens.messages.littenTitle', {
          species: species?.labelOne,
          title: litten?.title,
          type: type?.label,
        })
      : translate('screens.messages.littenRemoved')

  const navigation = useNavigation()

  const deleteConversation = async () => {
    const thisChat = new Chat(chat)
    await thisChat.deleteForUser(userUid)
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
          user: recipient,
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
      disabled: !recipientExists,
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
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          <View style={styles.headerContainer}>
            <UIAvatar
              source={
                recipient?.photoURL
                  ? { uri: recipient.photoURL }
                  : placeholderUser
              }
              containerStyle={styles.avatarContainer}
            />
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {shortenName(recipient.displayName)}
              </Text>
              <Text numberOfLines={1} style={styles.subtitle}>
                {subtitle}
              </Text>
            </View>
            <View style={styles.conversationOptions}>
              <UIDropdown
                placement="bottom"
                options={conversationOptions}
                menuTrigger={
                  <UIImage
                    source={iconMoreOptions}
                    style={styles.moreOptions}
                  />
                }
              />
            </View>
          </View>
        </ScreenSimpleHeaderTemplate>
      }
      behavior={null}
      style={styles.messagesContainer}>
      <PrivateMessages chat={chat} recipient={recipient} litten={litten} />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  avatarContainer: {
    marginLeft: USER_AVATAR_SIZE_MINI / 2,
    marginRight: USER_AVATAR_SIZE_MINI / 3,
  },
  title: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  subtitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },
  conversationOptions: {
    height: USER_AVATAR_SIZE_MINI,
    width: USER_AVATAR_SIZE_MINI,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moreOptions: {
    height: UI_EXTRA_OPTION_SIZE,
  },
})

export default MessagePrivate
