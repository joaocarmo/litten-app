/**
 * @format
 * @flow
 */

import React, { useState, useCallback, useEffect } from 'react'
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
      wrapperStyle={{
        right: {
          backgroundColor: colors.blue,
        },
        left: {
          backgroundColor: colors.lighterGray,
        },
      }}
    />
  )

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
    />
  )
}

export default PrivateMessages
