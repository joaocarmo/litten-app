/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Node } from 'react'
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import { useNotifications, usePaddingBottom } from 'hooks'
import {
  useActiveChats,
  useAppNotifications,
  useCacheLittens,
  useCacheUsers,
  useCurrentlyActiveChat,
  useDebouncedCallback,
  useTheme,
  useUserUid,
} from 'hooks'
import { Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Chat from 'model/chat'
import BottomLoader, {
  ListFooterComponentStyle,
} from 'components/bottom-loader'
import Empty from 'components/empty'
import { placeholderEmptyMessages } from 'images'
import { UIMessage, UILoader } from 'ui-elements'
import { debugLog, logError } from 'utils/dev'
import {
  getListItemLayout,
  littenToHeaderTitle,
  shortenName,
} from 'utils/functions'
import {
  CHATS_INITIAL_NUM_TO_RENDER,
  PLACEHOLDER_USER_DISPLAY_NAME,
  SCREEN_MESSAGE_PRIVATE,
  UI_HIDDEN_OPTION_WIDTH,
} from 'utils/constants'
import { translate } from 'utils/i18n'

const ActiveMessages: (args: any) => Node = () => {
  const [chats, setChats] = useActiveChats()
  const [displayChats, setDisplayChats] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [lastChat, setLastChat] = useState(null)
  const [listIsScrollable, setListIsScrollable] = useState(false)
  const [getLitten] = useCacheLittens()
  const [getUser] = useCacheUsers()

  const userUid = useUserUid()

  const [currentlyActiveChat] = useCurrentlyActiveChat()

  const navigation = useNavigation()
  const screenIsFocused = useIsFocused()

  const notifications = useNotifications()
  const [, setAppNotifications] = useAppNotifications()

  const withPaddingBottom = usePaddingBottom()

  const {
    commonStyles: {
      commonStyles: { contentContainerStyle },
    },
  } = useTheme()

  useFocusEffect(
    useCallback(() => {
      setAppNotifications({
        lastCheckAt: new Date().valueOf(),
        unreadChatsNum: 0,
      })
    }, [setAppNotifications]),
  )

  const handleChatNotifications = useCallback(
    ({ chat, litten, recipient }) => {
      const newChatEvent = new Chat(chat)

      if (
        currentlyActiveChat !== newChatEvent.id &&
        !newChatEvent.readBy(userUid) &&
        newChatEvent.lastMessageBy !== userUid
      ) {
        const title = littenToHeaderTitle(litten)
        const message = chat.lastMessage
        notifications.messageNotification(title, message, {
          dry: screenIsFocused,
          userInfo: { chat, litten, recipient },
        })
      }
    },
    [currentlyActiveChat, notifications, screenIsFocused, userUid],
  )

  const prepareChats = useCallback(async () => {
    if (chats.length) {
      debugLog('[CHATS] prepareChats')

      const preparedChats = []

      for (const chat of chats) {
        const litten = await getLitten(chat.littenUid)

        const recipientUid = chat.participants.find((id) => id !== userUid)

        const recipient = await getUser(recipientUid)

        const preparedChat = {
          key: chat.id,
          chat,
          litten,
          recipient,
        }

        preparedChats.push(preparedChat)

        handleChatNotifications(preparedChat)
      }

      setDisplayChats(preparedChats)
    }

    setIsLoading(false)
  }, [chats, getLitten, getUser, handleChatNotifications, userUid])

  const [updateChats] = useDebouncedCallback(
    useCallback(
      (querySnapshot, error, previousChats = []) => {
        if (!querySnapshot || error) {
          logError(error)
        } else if (!querySnapshot.empty) {
          debugLog('[CHATS] updateChats')

          const userChats = [...previousChats]
          let currentChat = null

          querySnapshot.forEach((documentSnapshot) => {
            currentChat = documentSnapshot
            const userChat = {
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
              key: documentSnapshot.id,
            }

            userChats.push(userChat)
          })

          setChats(userChats)
          setLastChat(currentChat)

          if (hasMore && querySnapshot.size < CHATS_INITIAL_NUM_TO_RENDER) {
            debugLog('[CHATS] updateChats setHasMore')

            setHasMore(false)
          }
        } else {
          setIsLoading(false)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [setChats],
    ),
  )

  const clearChats = useCallback(() => {
    setChats([])
    setIsLoading(false)
  }, [setChats, setIsLoading])

  useEffect(() => {
    debugLog('[CHATS] useEffect chats:', chats.length)

    prepareChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])

  useEffect(() => {
    if (userUid) {
      debugLog('[CHATS] useEffect subscriber with userUid:', userUid)

      const subscriber = Chat.subscribeForUser(userUid).onSnapshot(updateChats)

      return () => {
        debugLog('[CHATS] useEffect remove subscriber with userUid:', userUid)

        subscriber()
      }
    } else {
      debugLog('[CHATS] useEffect clearChats')

      clearChats()
    }
  }, [clearChats, updateChats, userUid])

  const handleOnScroll = useCallback(() => {
    if (!listIsScrollable) {
      debugLog('[SEARCH] handleOnScroll')

      setListIsScrollable(true)
    }
  }, [listIsScrollable])

  const handleOnEndReached = useCallback(async () => {
    if (
      (chats.length >= CHATS_INITIAL_NUM_TO_RENDER,
      listIsScrollable && !isLoadingMore && hasMore)
    ) {
      debugLog('[CHATS] onEndReached')

      setIsLoadingMore(true)
      const previousChats = await Chat.getPreviousChats(userUid, lastChat)
      updateChats(previousChats, null, chats)
      setIsLoadingMore(false)
    }
  }, [
    chats,
    hasMore,
    isLoadingMore,
    lastChat,
    listIsScrollable,
    updateChats,
    userUid,
  ])

  const deleteConversation = useCallback(
    async (chatObj) => {
      debugLog('[CHATS] deleteConversation')

      const chat = new Chat(chatObj)

      try {
        await chat.deleteForUser(userUid)
        if (chats.length === 1) {
          setDisplayChats([])
        }
      } catch (err) {
        logError(err)
      }
    },
    [chats.length, userUid],
  )

  const confirmDeleteConversation = useCallback(
    async (chat) => {
      debugLog('[CHATS] confirmDeleteConversation')

      const { participants } = chat
      const recipientUid = participants.find((id) => id !== userUid)
      const recipient = await getUser(recipientUid)

      Alert.alert(
        translate('cta.deleteConversation'),
        translate('feedback.confirmMessages.deleteConversation', {
          user: recipient?.displayName || translate('ui.placeholders.user'),
        }),
        [
          {
            text: translate('cta.yes'),
            onPress: () => deleteConversation(chat),
            style: 'destructive',
          },
          {
            text: translate('cta.no'),
            onPress: () => null,
          },
        ],
      )
    },
    [deleteConversation, getUser, userUid],
  )

  const hiddenOptions = useMemo(
    () => [
      {
        key: 'HIDDEN_OPTION_DELETE',
        label: translate('cta.delete'),
        onPress: confirmDeleteConversation,
        style: { backgroundColor: 'red' },
      },
    ],
    [confirmDeleteConversation],
  )

  const rightOpenValue = useMemo(
    () => -(hiddenOptions.length * UI_HIDDEN_OPTION_WIDTH),
    [hiddenOptions.length],
  )

  const getItemLayout = useCallback(getListItemLayout, [])

  const renderItem = useCallback(
    ({ item: { chat: chatObject, litten, recipient } }) => {
      const chat = new Chat(chatObject)
      const header = littenToHeaderTitle(litten)
      const read = chat.readBy(userUid)
      const { displayName } = recipient

      return (
        <UIMessage.Preview
          from={shortenName(displayName) || PLACEHOLDER_USER_DISPLAY_NAME}
          header={header}
          lastActivity={chat.updatedAt}
          onPress={() =>
            navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
              chat: chatObject,
              recipient,
              litten,
            })
          }
          read={read}>
          {chat.lastMessage}
        </UIMessage.Preview>
      )
    },
    [navigation, userUid],
  )

  const renderHiddenItem = useCallback(
    ({ item: { chat: chatObject } }) => {
      const chat = new Chat(chatObject)
      const read = chat.readBy(userUid)

      return (
        <UIMessage.Hidden read={read}>
          {hiddenOptions.map(
            ({ key, label, onPress: onHiddenItemPress, style }) => (
              <UIMessage.HiddenItem
                onPress={() => onHiddenItemPress({ read, ...chatObject })}
                style={style}
                key={key}>
                {label}
              </UIMessage.HiddenItem>
            ),
          )}
        </UIMessage.Hidden>
      )
    },
    [hiddenOptions, userUid],
  )

  const ListEmptyComponent = useMemo(
    () => (
      <Empty
        imageSource={placeholderEmptyMessages}
        header={translate('screens.messages.emptyTitle')}>
        {translate('screens.messages.emptyText')}
      </Empty>
    ),
    [],
  )

  const ListFooterComponent = useMemo(
    () => <BottomLoader active={isLoadingMore} />,
    [isLoadingMore],
  )

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <SwipeListView
      data={displayChats}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={rightOpenValue}
      friction={100}
      disableRightSwipe
      bounces={false}
      showsVerticalScrollIndicator={false}
      getItemLayout={getItemLayout}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
      onScroll={handleOnScroll}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.1}
      initialNumToRender={CHATS_INITIAL_NUM_TO_RENDER}
      ListFooterComponent={ListFooterComponent}
      ListFooterComponentStyle={ListFooterComponentStyle}
    />
  )
}

export default ActiveMessages
