/**
 * @format
 * @flow
 */

import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import colors from 'styles/colors'

const otherUser = {
  _id: 2,
  name: 'Obi-Wan Kenobi',
  avatar: 'https://placeimg.com/140/140/any',
}

const selfUser = {
  _id: 1,
  name: 'General Grievous',
  avatar: 'https://placeimg.com/140/140/any',
}

const PrivateMessages: (args: any) => React$Node = ({ conversationID }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: 'General Kenobi !',
        createdAt: new Date(),
        user: selfUser,
      },
      {
        _id: 1,
        text: 'Hello there !',
        createdAt: new Date(),
        user: otherUser,
      },
    ])
  }, [])

  const onSend = useCallback((msgs = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs))
  }, [])

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
      onSend={(msgs) => onSend(msgs)}
      user={selfUser}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      timeTextStyle={{
        left: styles.timeTextStyle,
        right: styles.timeTextStyle,
      }}
      parsePatterns={parsePatterns}
      placeholderTextColor={colors.darkGray}
      minInputToolbarHeight={54}
      keyboardShouldPersistTaps="never"
      scrollToBottom
    />
  )
}

const styles = StyleSheet.create({
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
    minHeight: 54,
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

export default PrivateMessages
