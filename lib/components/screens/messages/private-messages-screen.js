/**
 * @format
 * @flow
 */

import React from 'react'
import { Alert, Image, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import PrivateMessages from './private-messages'
import { UIDropdown } from 'ui-elements'
import { iconMoreOptions } from 'images'
import {
  CONVERSATION_BLOCK_USER,
  CONVERSATION_DELETE_CONVERSATION,
  CONVERSATION_VIEW_PROFILE,
  SCREEN_USER_PROFILE,
  USER_AVATAR_SIZE_MINI,
} from 'utils/constants'
import colors from 'styles/colors'
import { translate } from 'utils/i18n'

const moreOptionsSize = 18

const MessagePrivate: (args: any) => React$Node = ({ route }) => {
  const navigation = useNavigation()

  const deleteConversation = () => {
    Alert.alert(
      translate('cta.deleteConversation'),
      translate('feedback.confirmMessages.deleteConversation', {
        user: route?.params?.conversationUser?.name,
      }),
      [
        {
          text: translate('cta.yes'),
          onPress: () => null,
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
        { cancelable: false },
      ],
    )
  }

  const blockUser = () => {
    Alert.alert(
      translate('cta.blockUser'),
      translate('feedback.confirmMessages.blockUser', {
        user: route?.params?.conversationUser?.name,
      }),
      [
        {
          text: translate('cta.yes'),
          onPress: () => null,
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
        { cancelable: false },
      ],
    )
  }

  const conversationOptions = [
    {
      key: CONVERSATION_VIEW_PROFILE,
      label: translate('screens.messages.options.viewProfile'),
      value: CONVERSATION_VIEW_PROFILE,
      onSelect: () =>
        navigation.navigate(SCREEN_USER_PROFILE, {
          title: route?.params?.conversationUser?.name,
        }),
    },
    {
      key: CONVERSATION_DELETE_CONVERSATION,
      label: translate('screens.messages.options.deleteConversation'),
      value: CONVERSATION_DELETE_CONVERSATION,
      onSelect: deleteConversation,
    },
    {
      key: CONVERSATION_BLOCK_USER,
      label: translate('screens.messages.options.blockUser'),
      value: CONVERSATION_BLOCK_USER,
      onSelect: blockUser,
    },
  ]

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: route?.params?.conversationUser?.avatar }}
              style={styles.avatar}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.username}>{`@${route?.params?.title}`}</Text>
              <Text style={styles.timestamp}>{route?.params?.subTitle}</Text>
            </View>
            <View style={styles.conversationOptions}>
              <UIDropdown
                placement="bottom"
                options={conversationOptions}
                menuTrigger={
                  <Image
                    source={iconMoreOptions}
                    style={styles.moreOptions}
                    resizeMode="contain"
                  />
                }
              />
            </View>
          </View>
        </ScreenSimpleHeaderTemplate>
      }
      behavior={null}
      style={styles.messagesContainer}>
      <PrivateMessages />
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
  avatar: {
    height: USER_AVATAR_SIZE_MINI,
    width: USER_AVATAR_SIZE_MINI,
    borderRadius: USER_AVATAR_SIZE_MINI / 2,
    alignSelf: 'flex-start',
    marginLeft: USER_AVATAR_SIZE_MINI / 2,
    marginRight: USER_AVATAR_SIZE_MINI / 3,
  },
  username: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  timestamp: {
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
    height: moreOptionsSize,
  },
})

export default MessagePrivate
