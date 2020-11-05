/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useCallback, useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import Chat from 'model/chat'
import Message from 'model/message'
import { debugLog } from 'utils/functions'
import { locale } from 'utils/day'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'
import { UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT } from 'utils/constants'

const mapStateToProps = (state) => ({
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = () => ({})

const PrivateMessages: (args: any) => React$Node = ({
  chat: chatProp,
  user: { id: userUid, photoURL, displayName },
  recipient,
  litten,
}) => {
  const [chatUid, setChatUid] = useState('')
  const [messages, setMessages] = useState([])

  const user = useRef({
    _id: userUid,
    avatar: photoURL,
    name: displayName,
  }).current

  const recipientUser = useRef({
    _id: recipient.id,
    avatar: recipient.photoURL,
    name: recipient.displayName,
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

  const chat = useRef(
    new Chat(
      chatProp ?? {
        littenSpecies: litten.species,
        littenType: litten.type,
        littenUid: litten.id,
        participants: [userUid, recipient.id],
      },
    ),
  ).current

  const message = useRef(new Message({ chatUid: chat.id || chatUid, userUid }))
    .current

  const refreshChat = useCallback(async () => {
    await chat.get(userUid)
    message.chatUid = chat.id
    setChatUid(chat.id)
    debugLog('REFRESHED CHAT...')
  }, [chat, message, userUid])

  useEffect(() => {
    refreshChat()
  }, [refreshChat])

  useEffect(() => {
    if (message.chatUid || chatUid) {
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
  }, [chatUid, getUserFromUid, message])

  const onSend = async (messagesToSend = []) => {
    const [currentMessage] = messagesToSend

    if (!chat.id) {
      await chat.create()
      debugLog('CREATED NEW CHAT...')
    }

    chat.lastMessage = currentMessage.text

    message.text = currentMessage.text
    message.append()
  }

  const handleUrlPress = () => null

  const handlePhonePress = () => null

  const handleEmailPress = () => null

  const handleNamePress = () => null

  const handleHashtagPress = () => null

  const parsePatterns = (linkStyle) => [
    { type: 'url', style: styles.link, onPress: handleUrlPress },
    { type: 'phone', style: styles.link, onPress: handlePhonePress },
    { type: 'email', style: styles.link, onPress: handleEmailPress },
    {
      pattern: /@(\w+)/,
      style: styles.clickable,
      onPress: handleNamePress,
    },
    { pattern: /#(\w+)/, style: styles.clickable, onPress: handleHashtagPress },
  ]

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMessages)
