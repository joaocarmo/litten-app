/**
 * @format
 * @flow
 */

import { useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsActions } from 'store/actions/chats'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Alert, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useCache, useDebouncedState, useUserUid } from 'hooks'
import Chat from 'model/chat'
import Litten from 'model/litten'
import User from 'model/user'
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
  DEBOUNCE_TIMEOUT,
  SCREEN_MESSAGE_PRIVATE,
  STRUCTURE_TAB_NAV_HEIGHT,
  UI_ELEMENT_BORDER_MARGIN,
  UI_HIDDEN_OPTION_WIDTH,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { BasicChat } from 'model/types/chat'

type OwnProps = {||}
type StateProps = {|
  +chats: BasicChat[],
|}
type ChatsActionsType = typeof ChatsActions
type DispatchProps = {|
  ...ChatsActionsType,
|}
type ActiveMessagesProps = {
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
}

const mapStateToProps = (state: State): StateProps => ({
  chats: state.chats.active,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(ChatsActions, dispatch)

const ActiveMessages: (args: any) => React$Node = ({ chats, setChats }) => {
  const [listIsScrollable, setListIsScrollable] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [littens, addLitten] = useCache('littens')
  const [users, addUser] = useCache('users')
  const [lastChat, setLastChat] = useState(null)
  const [isLoading, setIsLoading] = useDebouncedState(true, DEBOUNCE_TIMEOUT)

  const userUid = useUserUid()

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const updateLittens = useCallback(
    async (id) => {
      if (!littens[id]) {
        debugLog('[CHATS] updateLittens for', id)

        const litten = await getFromModel(Litten, id)
        addLitten(litten.toJSON())
      }
    },
    [addLitten, littens],
  )

  const updateUsers = useCallback(
    async (id) => {
      if (!users[id]) {
        debugLog('[CHATS] updateUsers for:', id)

        const user = await getFromModel(User, id)
        addUser(user.toJSON())
      }
    },
    [addUser, users],
  )

  const updateChats = useCallback(
    (querySnapshot, error, previousChats = []) => {
      if (!querySnapshot || error) {
        logError(error)
      } else if (!querySnapshot.empty) {
        debugLog('[CHATS] updateChats of size', querySnapshot.size)

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
          userChat.participants.forEach(updateUsers)
          updateLittens(userChat.littenUid)
        })
        setChats(userChats)
        setLastChat(currentChat)
      }

      setIsLoading(false)
    },
    [setChats, setIsLoading, updateLittens, updateUsers],
  )

  const clearChats = useCallback(() => {
    setChats([])
    setIsLoading(false)
  }, [setChats, setIsLoading])

  useEffect(() => {
    if (userUid) {
      debugLog('[CHATS] useEffect with userUid:', userUid)

      const subscriber = Chat.subscribeForUser(userUid).onSnapshot(updateChats)

      return () => subscriber()
    } else {
      debugLog('[CHATS] useEffect clearChats')

      clearChats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUid])

  const deleteConversation = useCallback(
    async (chatObj) => {
      debugLog('[CHATS] deleteConversation')

      const chat = new Chat(chatObj)

      try {
        await chat.deleteForUser(userUid)
        if (chats.length === 1) {
          setChats([])
        }
      } catch (err) {
        logError(err)
      }
    },
    [chats.length, setChats, userUid],
  )

  const handleOnScroll = useCallback(() => {
    if (!listIsScrollable) {
      debugLog('[SEARCH] handleOnScroll')

      setListIsScrollable(true)
    }
  }, [listIsScrollable])

  const handleOnEndReached = useCallback(async () => {
    if (listIsScrollable && !isLoadingMore) {
      debugLog('[CHATS] onEndReached')

      setIsLoadingMore(true)
      const previousChats = await Chat.getPreviousChats(userUid, lastChat)
      updateChats(previousChats, null, chats)
      setIsLoadingMore(false)
    }
  }, [chats, isLoadingMore, lastChat, listIsScrollable, updateChats, userUid])

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

  const getItemLayout = useCallback(getListItemLayout, [])

  const renderItem = useCallback(
    ({ item: chatObject }) => {
      const chat = new Chat(chatObject)
      const recipientUid = chat.participants.find((id) => id !== userUid)
      const recipient = users[recipientUid]
      const litten = littens[chat.littenUid]
      const header = littenToHeaderTitle(litten)

      return (
        <UIMessage.Preview
          key={chat.id}
          from={shortenName(recipient?.displayName)}
          header={header}
          lastActivity={chat.updatedAt}
          onPress={() =>
            navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
              chat: chatObject,
              recipient,
              litten,
            })
          }
          read={chat.readBy(userUid)}>
          {chat.lastMessage}
        </UIMessage.Preview>
      )
    },
    [littens, navigation, userUid, users],
  )

  const renderHiddenItem = useCallback(
    ({ item: chatObject }) => {
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
      return (
        <UILoader active={isLoadingMore} containerStyle={styles.bottomLoader} />
      )
    }

    return null
  }, [isLoadingMore])

  if (isLoading) {
    return <UILoader active={isLoading} />
  }

  return (
    <SwipeListView
      data={chats}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-(hiddenOptions.length * UI_HIDDEN_OPTION_WIDTH)}
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
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
  bottomLoader: {
    paddingTop: UI_ELEMENT_BORDER_MARGIN * 2,
    paddingBottom: UI_ELEMENT_BORDER_MARGIN * 2,
  },
})

export default connect<
  ActiveMessagesProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveMessages)
