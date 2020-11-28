/**
 * @format
 * @flow
 */

import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Chat from 'model/chat'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { UIAvatar, UIDropdown, UIImage } from 'ui-elements'
import { iconMoreOptions, placeholderUser } from 'images'
import { getFromListByKey, shortenName } from 'utils/functions'
import {
  CONVERSATION_DELETE_CONVERSATION,
  CONVERSATION_REPORT_CONVERSATION,
  CONVERSATION_VIEW_LITTEN,
  CONVERSATION_VIEW_PROFILE,
  FEEDBACK_TYPE_ABUSE,
  SCREEN_LITTEN_POST,
  SCREEN_PROFILE_REPORT,
  SCREEN_USER_PROFILE,
  UI_EXTRA_OPTION_SIZE,
  USER_AVATAR_SIZE_MINI,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const MessagePrivateHeader: (args: any) => React$Node = ({
  chat,
  litten,
  recipient,
  user,
}) => {
  const navigation = useNavigation()

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
        navigation.navigate(SCREEN_PROFILE_REPORT, {
          type: FEEDBACK_TYPE_ABUSE,
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
    <ScreenSimpleHeaderTemplate withGoBack>
      <View style={styles.headerContainer}>
        <UIAvatar
          source={
            recipient?.photoURL ? { uri: recipient.photoURL } : placeholderUser
          }
          containerStyle={[
            styles.avatarContainer,
            Platform.OS !== 'android'
              ? styles.avatarContainerSpaced
              : undefined,
          ]}
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
              <UIImage source={iconMoreOptions} style={styles.moreOptions} />
            }
          />
        </View>
      </View>
    </ScreenSimpleHeaderTemplate>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    top: USER_AVATAR_SIZE_MINI / 7,
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
    marginRight: USER_AVATAR_SIZE_MINI / 3,
  },
  avatarContainerSpaced: {
    marginLeft: USER_AVATAR_SIZE_MINI / 2,
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  subtitle: {
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

export default MessagePrivateHeader
