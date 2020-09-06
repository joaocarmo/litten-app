/**
 * @format
 * @flow
 */

import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import colors from 'styles/colors'

const PrivateMessages: (args: any) => React$Node = ({ conversationID }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((msgs = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs))
  }, [])

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

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      timeTextStyle={{
        left: styles.timeTextStyle,
        right: styles.timeTextStyle,
      }}
      parsePatterns={parsePatterns}
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
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  wrapperStyleRight: {
    borderWidth: 1,
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
})

export default PrivateMessages
