/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  useActiveChats,
  useCacheLittens,
  useCacheUsers,
  useUserUid,
} from 'hooks'
import { Alert, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Chat from 'model/chat'
import Litten from 'model/litten'
import User from 'model/user'
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
import { memoizedGetFromModel as getFromModel } from 'utils/network'
import {
  CHATS_INITIAL_NUM_TO_RENDER,
  PLACEHOLDER_USER_DISPLAY_NAME,
  SCREEN_MESSAGE_PRIVATE,
  STRUCTURE_TAB_NAV_HEIGHT,
  UI_HIDDEN_OPTION_WIDTH,
} from 'utils/constants'
import { translate } from 'utils/i18n'

const ActiveMessages: (args: any) => React$Node = () => {
  const [chats, setChats] = useActiveChats()
  const [displayChats, setDisplayChats] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [lastChat, setLastChat] = useState(null)
  const [listIsScrollable, setListIsScrollable] = useState(false)
  const [littens, addLitten] = useCacheLittens()
  const [users, addUser] = useCacheUsers()

  const userUid = useUserUid()

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const getLitten = useCallback(
    async (id) => {
      if (!littens[id]) {
        debugLog('[CHATS] getLitten for', id)

        const litten = await getFromModel(Litten, id)
        const littenInfo = litten.toJSON()
        addLitten(littenInfo)

        return littenInfo
      }

      return littens[id]
    },
    [addLitten, littens],
  )

  const getUser = useCallback(
    async (id) => {
      if (!users[id]) {
        debugLog('[CHATS] getUser for:', id)

        const user = await getFromModel(User, id)
        const userInfo = user.toJSON()
        addUser(userInfo)

        return userInfo
      }

      return users[id]
    },
    [addUser, users],
  )

  const prepareChats = useCallback(
    async (newChats) => {
      if (newChats.length) {
        debugLog('[CHATS] prepareChats')

        const preparedChats = []

        for (const chat of newChats) {
          const litten = await getLitten(chat.littenUid)

          const recipientUid = chat.participants.find((id) => id !== userUid)

          const recipient = await getUser(recipientUid)

          preparedChats.push({
            key: chat.id,
            chat,
            litten,
            recipient,
          })
        }

        setDisplayChats(preparedChats)
      }

      setIsLoading(false)
    },
    [getLitten, getUser, userUid],
  )

  const updateChats = useCallback(
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
        prepareChats(userChats)

        if (querySnapshot.size < CHATS_INITIAL_NUM_TO_RENDER) {
          debugLog('[CHATS] updateChats setHasMore')

          setHasMore(false)
        }
      } else {
        setIsLoading(false)
      }
    },
    [prepareChats, setChats],
  )

  const clearChats = useCallback(() => {
    setChats([])
    setIsLoading(false)
  }, [setChats, setIsLoading])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUid])

  const handleOnScroll = useCallback(() => {
    if (!listIsScrollable) {
      debugLog('[SEARCH] handleOnScroll')

      setListIsScrollable(true)
    }
  }, [listIsScrollable])

  const handleOnEndReached = useCallback(async () => {
    if (listIsScrollable && !isLoadingMore && hasMore) {
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
    (chat) => {
      debugLog('[CHATS] confirmDeleteConversation')

      const { participants } = chat
      const recipientUid = participants.find((id) => id !== userUid)
      const recipient = users[recipientUid]

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
    [deleteConversation, userUid, users],
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
              read,
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

  const ListFooterComponent = useMemo(() => {
    if (isLoadingMore) {
      return <BottomLoader active />
    }

    return null
  }, [isLoadingMore])

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
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingBottom: STRUCTURE_TAB_NAV_HEIGHT + insets.bottom,
        },
      ]}
      onScroll={handleOnScroll}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.1}
      initialNumToRender={CHATS_INITIAL_NUM_TO_RENDER}
      ListFooterComponent={ListFooterComponent}
      ListFooterComponentStyle={ListFooterComponentStyle}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default ActiveMessages
