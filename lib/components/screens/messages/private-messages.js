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
  LoadEarlier,
  Send,
} from 'react-native-gifted-chat'
import { useActionSheet } from '@expo/react-native-action-sheet'
import Chat from 'model/chat'
import Message from 'model/message'
import { openURL } from 'utils/ui'
import { debugLog } from 'utils/dev'
import { locale } from 'utils/day'
import { translate } from 'utils/i18n'
import {
  DB_MESSAGE_BATCH_AMOUNT,
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
  const [lastMessage, setLastMessage] = useState(null)
  const [message, setMessage] = useState(
    new Message({ chatUid: chat.id, userUid }),
  )
  const [messages, setMessages] = useState([])
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)

  const { showActionSheetWithOptions } = useActionSheet()

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

  const messageMapper = useCallback(
    (currentMessage) => ({
      _id: currentMessage.id ?? '',
      text: currentMessage.text ?? '',
      createdAt: currentMessage.createdAt ?? new Date(),
      user: getUserFromUid(currentMessage.userUid),
    }),
    [getUserFromUid],
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

  const updateMessages = useCallback(
    (querySnapshot, previousMessages = []) => {
      const chatMessages = [...previousMessages]
      let currentMessage = null

      querySnapshot.forEach((documentSnapshot) => {
        currentMessage = documentSnapshot
        const chatMessage = new Message({
          ...currentMessage.data(),
          id: currentMessage.id,
        })
        chatMessages.push(messageMapper(chatMessage))
      })
      setMessages(chatMessages)
      setLastMessage(currentMessage)
    },
    [messageMapper],
  )

  useEffect(() => {
    if (message.chatUid) {
      const subscriber = message
        .subscribeToChat()
        .onSnapshot((querySnapshot) => updateMessages(querySnapshot))

      return () => subscriber()
    }
  }, [getUserFromUid, message, messageMapper, updateMessages])

  const onLoadEarlier = async () => {
    setIsLoadingEarlier(true)
    const previousMessages = await message.getPreviousMessages(lastMessage)
    updateMessages(previousMessages, messages)
    setIsLoadingEarlier(false)
  }

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
    showActionSheetWithOptions(
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
      showActionSheetWithOptions(
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

  const renderLoadEarlier = (props) => (
    <LoadEarlier {...props} label={translate('screens.messages.loadEarlier')} />
  )

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendContainer} />
  )

  return (
    <GiftedChat
      messages={messages}
      onLoadEarlier={() => {
        onLoadEarlier()
      }}
      onSend={(...args) => {
        onSend(...args)
      }}
      user={user}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderLoadEarlier={renderLoadEarlier}
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
      isLoadingEarlier={isLoadingEarlier}
      loadEarlier={messages.length >= DB_MESSAGE_BATCH_AMOUNT}
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
