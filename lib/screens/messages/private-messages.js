/**
 * @format
 * @flow
 */

import { useCallback, useState, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import {
  Bubble,
  EmptyChat,
  InputToolbar,
  LoadEarlier,
  ScrollToBottomComponent,
  Send,
  useParsePatterns,
} from './inner-components'
import Chat from 'model/chat'
import Message from 'model/message'
import { debugLog } from 'utils/dev'
import { locale } from 'utils/day'
import { translate } from 'utils/i18n'
import {
  DB_MESSAGE_BATCH_AMOUNT,
  UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
} from 'utils/constants'
import colors from 'styles/colors'

const PrivateMessages: (args: any) => React$Node = ({
  chat: chatProp,
  user: { id: userUid, photoURL, displayName },
  recipient,
  litten,
}) => {
  const [chatUid, setChatUid] = useState('')
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
  const [hasMoreMessages, setHasMoreMessages] = useState(false)
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)

  const parsePatterns = useParsePatterns()

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
      setChatUid(chat.id)
      debugLog('REFRESHED CHAT...')
    }
  }, [chat, message, userUid])

  const createNewChat = async () => {
    if (!chat.id) {
      await chat.create()
      debugLog('CREATED NEW CHAT...')

      await refreshChat()
    }
  }

  useEffect(() => {
    refreshChat()
  }, [refreshChat])

  const updateMessages = useCallback(
    (querySnapshot, error = null, previousMessages = []) => {
      if (!querySnapshot || error) {
        debugLog(error)
        return
      }
      if (!querySnapshot.empty) {
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
        setHasMoreMessages(querySnapshot.size >= DB_MESSAGE_BATCH_AMOUNT)
      }
    },
    [messageMapper],
  )

  useEffect(() => {
    if (message.chatUid || chatUid) {
      const subscriber = message
        .subscribeToChat()
        .onSnapshot((querySnapshot, error) =>
          updateMessages(querySnapshot, error),
        )

      return () => subscriber()
    }
  }, [chatUid, getUserFromUid, message, messageMapper, updateMessages])

  const onLoadEarlier = async () => {
    setIsLoadingEarlier(true)
    const previousMessages = await message.getPreviousMessages(lastMessage)
    updateMessages(previousMessages, null, messages)
    setIsLoadingEarlier(false)
  }

  const onSend = async (messagesToSend = []) => {
    const [currentMessage] = messagesToSend

    await createNewChat()

    chat.lastMessage = currentMessage.text

    message.text = currentMessage.text
    message.append()
  }

  const renderBubble = (props) => <Bubble {...props} />

  const renderChatEmpty = (props) => <EmptyChat litten={litten} {...props} />

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
      renderChatEmpty={renderChatEmpty}
      renderInputToolbar={InputToolbar}
      renderLoadEarlier={LoadEarlier}
      renderSend={Send}
      scrollToBottomComponent={ScrollToBottomComponent}
      timeTextStyle={{
        left: styles.timeTextStyle,
        right: styles.timeTextStyle,
      }}
      parsePatterns={parsePatterns}
      loadEarlier={hasMoreMessages}
      isLoadingEarlier={isLoadingEarlier}
      placeholder={translate('screens.messages.inputPlaceholder')}
      minInputToolbarHeight={UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT}
      keyboardShouldPersistTaps="never"
      locale={locale}
      scrollToBottom
    />
  )
}

const styles = StyleSheet.create({
  timeTextStyle: {
    fontWeight: '200',
    color: colors.darkGray,
  },
})

export default PrivateMessages
