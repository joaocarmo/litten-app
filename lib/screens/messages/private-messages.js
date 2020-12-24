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
} from 'screens/messages/inner-components'
import { useChatMessages, useDebouncedState } from 'hooks'
import Chat from 'model/chat'
import Message from 'model/message'
import { UILoader } from 'ui-elements'
import { debugLog, logError } from 'utils/dev'
import { locale } from 'utils/day'
import { translate } from 'utils/i18n'
import {
  DB_MESSAGE_BATCH_AMOUNT,
  DEBOUNCE_TIMEOUT,
  UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
} from 'utils/constants'
import colors from 'styles/colors'

const PrivateMessages: (args: any) => React$Node = ({
  chat: chatProp,
  litten,
  recipient,
  user: { id: userUid, photoURL, displayName },
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
  const [messages, setMessages] = useChatMessages(chatUid, [])
  const [hasMoreMessages, setHasMoreMessages] = useState(false)
  const [isLoading, setIsLoading] = useDebouncedState(true, DEBOUNCE_TIMEOUT)
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
      sent: !!currentMessage.createdAt,
      pending: !currentMessage.createdAt,
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
      debugLog('[MESSAGES] REFRESHED CHAT...')
    }
    setIsLoading(false)
  }, [chat, message, setIsLoading, userUid])

  const createNewChat = async () => {
    if (!chat.id) {
      await chat.create()
      debugLog('[MESSAGES] CREATED NEW CHAT...')

      await refreshChat()
    }
  }

  const markAsRead = useCallback(() => {
    chat.read = userUid
  }, [chat, userUid])

  useEffect(() => {
    refreshChat()

    return () => markAsRead()
  }, [markAsRead, refreshChat])

  const updateMessages = useCallback(
    (querySnapshot, error = null, previousMessages = []) => {
      if (!querySnapshot || error) {
        logError(error)
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
    [messageMapper, setMessages],
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

  const immediatelyAppend = ({ text }) => {
    const previousMessages = [...messages]
    previousMessages.push(
      messageMapper({
        id: new Date().getTime(),
        text,
        createdAt: undefined,
        userUid,
      }),
    )
  }

  const onSend = async (messagesToSend = []) => {
    const [currentMessage] = messagesToSend

    immediatelyAppend(currentMessage)

    await createNewChat()

    chat.lastMessage = currentMessage.text

    message.text = currentMessage.text
    message.append()
  }

  const renderBubble = (props) => <Bubble {...props} />

  const renderChatEmpty = (props) => <EmptyChat litten={litten} {...props} />

  const renderLoading = () => <UILoader active />

  if (isLoading) {
    return renderLoading()
  }

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
      renderLoading={renderLoading}
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
