import { useCallback, useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { EasyChat } from 'react-native-easy-chat'
import type { IMessage, User } from 'react-native-easy-chat'
import {
  Bubble,
  EmptyChat,
  InputToolbar,
  LoadEarlier,
  ScrollToBottomComponent,
  Send,
  useParsePatterns,
} from '@screens/messages/inner-components'
import {
  useChatMessages,
  useCurrentlyActiveChat,
  useDebouncedState,
  useTheme,
  useUserInfo,
} from '@hooks'
import Chat from '@model/chat'
import Message from '@model/message'
import type { BasicMessage } from '@model/types/message'
import type { BasicChat } from '@model/types/chat'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import { UILoader } from '@ui-elements'
import { debugLog, logError } from '@utils/dev'
import { locale } from '@utils/day'
import { translate } from '@utils/i18n'
import {
  DB_MESSAGE_BATCH_AMOUNT,
  PLACEHOLDER_USER_DISPLAY_NAME,
  UI_MESSAGE_MIN_INPUT_TOOLBAR_HEIGHT,
} from '@utils/constants'
import privateMessagesComponentStyles from '@screens/messages/private-messages.styles'

export type PrivateMessagesProps = {
  chat: BasicChat
  litten: BasicLitten
  recipient: BasicUser
}

const PrivateMessages = ({
  chat: chatProp,
  litten,
  recipient,
}: PrivateMessagesProps) => {
  const [{ id: userUid, photoURL, displayName }] = useUserInfo()
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
  const [chatUid, setChatUid] = useState(chat.id || '')
  const [lastMessage, setLastMessage] = useState(null)
  const [message, setMessage] = useState(
    new Message({
      chatUid: chat.id as string,
      userUid,
    }),
  )
  const [messages, setMessages] = useChatMessages(chatUid, [])
  const [hasMoreMessages, setHasMoreMessages] = useState(false)
  const [isLoading, setIsLoading] = useDebouncedState(true)
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)
  const parsePatterns = useParsePatterns()
  const [currentlyActiveChat, setCurrentlyActiveChat] = useCurrentlyActiveChat()
  const { createStyles } = useTheme()

  const styles = createStyles(privateMessagesComponentStyles)

  const user = useRef({
    _id: userUid || 1,
    avatar: photoURL || undefined,
    name: displayName || PLACEHOLDER_USER_DISPLAY_NAME,
  }).current

  const recipientUser = useRef({
    _id: recipient?.id || 2,
    avatar: recipient?.photoURL || undefined,
    name: recipient?.displayName || PLACEHOLDER_USER_DISPLAY_NAME,
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
      debugLog('[MESSAGES] refreshChat', chat.id)
    }

    setIsLoading(false)
  }, [chat, message, setIsLoading, userUid])

  const createNewChat = useCallback(async () => {
    if (!chat.id) {
      await chat.create()
      debugLog('[MESSAGES] createNewChat', chat.id)
      await refreshChat()
    }
  }, [chat, refreshChat])

  const markAsRead = useCallback(() => {
    debugLog('[MESSAGES] markAsRead for', userUid)
    chat.setReadBy(userUid)
  }, [chat, userUid])

  useEffect(() => {
    debugLog('[MESSAGES] useEffect refreshChat — initial')
    refreshChat()
    return () => {
      debugLog('[MESSAGES] useEffect setCurrentlyActiveChat - cleanup')
      setCurrentlyActiveChat('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!lastMessage || lastMessage.data().userUid !== userUid) {
      markAsRead()
    }
  }, [markAsRead, lastMessage, userUid])

  useEffect(() => {
    if (chat.id && chatUid && !currentlyActiveChat) {
      debugLog('[MESSAGES] useEffect setCurrentlyActiveChat', chatUid)
      setCurrentlyActiveChat(chatUid)
    }
  }, [chat.id, chatUid, currentlyActiveChat, setCurrentlyActiveChat])

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
    if (chatUid) {
      debugLog('[MESSAGES] useEffect subscribeToChat', chatUid)
      const subscriber = message.subscribeToChat().onSnapshot(
        (querySnapshot) => updateMessages(querySnapshot, null),
        (error) => updateMessages(null, error),
      )
      return () => {
        debugLog('[MESSAGES] useEffect un-subscribeToChat', chatUid)
        subscriber()
      }
    }
  }, [chatUid, message, updateMessages])

  const onLoadEarlier = useCallback(async () => {
    debugLog('[MESSAGES] onLoadEarlier')
    setIsLoadingEarlier(true)
    const previousMessages = await message.getPreviousMessages(lastMessage)
    updateMessages(previousMessages, null, messages)
    setIsLoadingEarlier(false)
  }, [lastMessage, message, messages, updateMessages])

  const immediatelyAppend = useCallback(
    ({ text }) => {
      debugLog('[MESSAGES] immediatelyAppend', text)
      const previousMessages = [...messages] as Partial<BasicMessage>[]
      previousMessages.push(
        messageMapper({
          id: new Date().getTime(),
          text,
          createdAt: undefined,
          userUid,
        }),
      )
    },
    [messageMapper, messages, userUid],
  )

  const onSend = useCallback(
    async (messagesToSend = []) => {
      debugLog('[MESSAGES] onSend')
      const [currentMessage] = messagesToSend
      immediatelyAppend(currentMessage)
      await createNewChat()
      await chat.setLastMessage({
        lastMessage: currentMessage.text,
        lastMessageBy: userUid,
      })
      message.text = currentMessage.text
      message.append()
    },
    [chat, createNewChat, immediatelyAppend, message, userUid],
  )

  const renderBubble = useCallback((props) => <Bubble {...props} />, [])

  const renderInputToolbar = useCallback(
    (props) => <InputToolbar {...props} />,
    [],
  )

  const renderChatEmpty = useCallback(
    (): ReactNode => <EmptyChat litten={litten} />,
    [litten],
  )

  const renderLoading = useCallback(() => <UILoader active />, [])

  const renderScrollToBottomComponent = useCallback(
    () => <ScrollToBottomComponent />,
    [],
  )

  if (isLoading) {
    return renderLoading()
  }

  return (
    <EasyChat
      messages={messages as unknown as IMessage[]}
      onLoadEarlier={() => {
        onLoadEarlier()
      }}
      onSend={(...args) => {
        onSend(...args)
      }}
      user={user as User}
      renderBubble={renderBubble}
      renderChatEmpty={renderChatEmpty}
      renderInputToolbar={renderInputToolbar}
      renderLoadEarlier={LoadEarlier}
      renderLoading={renderLoading}
      renderSend={Send}
      scrollToBottomComponent={renderScrollToBottomComponent}
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
      listViewProps={{
        showsVerticalScrollIndicator: false,
      }}
      scrollToBottom
    />
  )
}

export default PrivateMessages
