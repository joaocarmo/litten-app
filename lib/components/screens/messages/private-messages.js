/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useCallback, useState, useEffect, useRef } from 'react'
import { Alert, StyleSheet } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import { UIActionSheet } from 'ui-elements'
import Chat from 'model/chat'
import Message from 'model/message'
import { openURL } from 'utils/ui'
import { debugLog } from 'utils/functions'
import { locale } from 'utils/day'
import { translate } from 'utils/i18n'
import {
  MAILTO_URI,
  SMS_URI,
  TEL_URI,
  UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
} from 'utils/constants'
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

type ParseShape = $FlowFixMe

const mapStateToProps = (state: State): StateProps => ({
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = null

const PrivateMessages: (args: any) => React$Node = ({
  chat: chatProp,
  user: { id: userUid, photoURL, displayName },
  recipient,
  litten,
}) => {
  const [chat, setChat] = useState(
    new Chat(
      chatProp ?? {
        littenSpecies: litten.species,
        littenType: litten.type,
        littenUid: litten.id,
        participants: [userUid, recipient.id],
      },
    ),
  )
  const [message, setMessage] = useState(
    new Message({ chatUid: chat.id, userUid }),
  )
  const [messages, setMessages] = useState([])

  const user = useRef({
    _id: userUid,
    avatar: photoURL,
    name: displayName,
  }).current

  const recipientUser = useRef({
    _id: recipient?.id,
    avatar: recipient?.photoURL,
    name: recipient?.displayName,
  }).current

  const getUserFromUid = useCallback(
    (id) => {
      if (id === userUid) {
        return user
      }
      return recipientUser
    },
    [recipientUser, user, userUid],
  )

  const refreshChat = useCallback(async () => {
    await chat.get(userUid)
    if (typeof chat.id === 'string') {
      message.chatUid = chat.id
      setChat(chat)
      setMessage(message)
      debugLog('REFRESHED CHAT...')
    }
  }, [chat, message, userUid])

  useEffect(() => {
    refreshChat()
  }, [refreshChat])

  useEffect(() => {
    if (message.chatUid) {
      const subscriber = message
        .subscribeToChat()
        .onSnapshot((querySnapshot) => {
          const chatMessages = []

          querySnapshot.forEach((documentSnapshot) => {
            const chatMessage = {
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
              key: documentSnapshot.id,
            }
            let createdAt = chatMessage.metadata?.createdAt?._seconds
            createdAt = createdAt ? createdAt * 1000 : new Date()
            chatMessages.push({
              _id: chatMessage.id,
              text: chatMessage.text,
              createdAt,
              user: getUserFromUid(chatMessage.userUid),
            })
          })
          setMessages(chatMessages)
        })

      return () => subscriber()
    }
  }, [getUserFromUid, message])

  const onSend = async (messagesToSend = []) => {
    const [currentMessage] = messagesToSend

    if (!chat.id) {
      await chat.create()
      if (typeof chat.id === 'string') {
        message.chatUid = chat.id
        setChat(chat)
        setMessage(message)
        debugLog('CREATED NEW CHAT...')
      }
    }

    chat.lastMessage = currentMessage.text

    message.text = currentMessage.text
    message.append()
  }

  const handleUrlPress = (url) => openURL(url)

  const handlePhonePress = (phoneNumber) => {
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          translate('screens.settings.contactCall'),
          translate('screens.settings.contactSMS'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          openURL(`${TEL_URI}${phoneNumber}`)
        } else if (buttonIndex === 2) {
          openURL(`${SMS_URI}${phoneNumber}`)
        }
      },
    )
  }

  const handleEmailPress = (email) => openURL(`${MAILTO_URI}${email}`)

  const handleHashtagPress = () =>
    Alert.alert(translate('feedback.errorMessages.notImplemented'))

  const parsePatterns = (linkStyle): ParseShape[] => [
    {
      type: 'url',
      style: [linkStyle, styles.link],
      onPress: handleUrlPress,
    },
    {
      type: 'phone',
      style: [linkStyle, styles.link],
      onPress: handlePhonePress,
    },
    {
      type: 'email',
      style: [linkStyle, styles.link],
      onPress: handleEmailPress,
    },
    {
      pattern: /#(\w+)/,
      style: [linkStyle, styles.clickable],
      onPress: handleHashtagPress,
    },
  ]

  const onLongPress = (context, currentMessage) => {
    if (currentMessage?.text) {
      UIActionSheet(
        {
          options: [translate('cta.cancel'), translate('cta.copy')],
          destructiveButtonIndex: null,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            Clipboard.setString(currentMessage.text)
          }
        },
      )
    }
  }

  const renderBubble = (props) => (
    <Bubble
      {...props}
      textStyle={{
        left: styles.textStyle,
        right: styles.textStyle,
      }}
      tickStyle={styles.tickStyle}
      wrapperStyle={{
        left: styles.wrapperStyleLeft,
        right: styles.wrapperStyleRight,
      }}
      onLongPress={onLongPress}
    />
  )

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputToolbarPrimary}
    />
  )

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer} />
  )

  return (
    <GiftedChat
      messages={messages}
      onSend={(...args) => {
        onSend(...args)
      }}
      user={user}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      timeTextStyle={{
        left: styles.timeTextStyle,
        right: styles.timeTextStyle,
      }}
      parsePatterns={parsePatterns}
      locale={locale}
      placeholder={translate('screens.messages.inputPlaceholder')}
      minInputToolbarHeight={UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT}
      keyboardShouldPersistTaps="never"
      scrollToBottom
    />
  )
}

const styles = StyleSheet.create({
  tickStyle: {
    color: colors.darkGray,
  },
  textStyle: {
    fontWeight: '200',
    color: colors.black,
  },
  timeTextStyle: {
    fontWeight: '200',
    color: colors.darkGray,
  },
  wrapperStyleLeft: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  wrapperStyleRight: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    backgroundColor: `${colors.blue}10`,
  },
  link: {
    fontWeight: '400',
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  clickable: {
    fontWeight: '400',
    color: colors.blue,
    textDecorationLine: 'none',
  },
  inputToolbar: {
    minHeight: UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 50,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    paddingLeft: 18,
    paddingRight: 18,
  },
  inputToolbarPrimary: {
    marginTop: 8,
  },
  sendContainer: {},
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
)(PrivateMessages)
