/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChatsActions } from 'store/actions/chats'
import { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, StyleSheet } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useDebouncedState } from 'hooks'
import Chat from 'model/chat'
import Litten from 'model/litten'
import User from 'model/user'
import Empty from 'components/empty'
import { placeholderEmptyMessages } from 'images'
import { UIMessage, UILoader } from 'ui-elements'
import { debugLog } from 'utils/dev'
import { getFromListByKey, shortenName } from 'utils/functions'
import {
  DEBOUNCE_TIMEOUT,
  SCREEN_MESSAGE_PRIVATE,
  STRUCTURE_TAB_NAV_HEIGHT,
  UI_HIDDEN_OPTION_WIDTH,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import type { ObjectById } from 'store/types'
import type { Dispatch, State } from 'store/types/state'
import type { BasicChat } from 'model/types/chat'
import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'

type OwnProps = {||}
type StateProps = {|
  +user: BasicUser,
  +chats: BasicChat[],
  +littens: ObjectById<BasicLitten>,
  +users: ObjectById<BasicUser>,
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
  user: state.authenticatedUser.extra,
  chats: state.chats.active,
  littens: state.chats.littens,
  users: state.chats.users,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(ChatsActions, dispatch)

const ActiveMessages: (args: any) => React$Node = ({
  chats,
  littens,
  setChats,
  setLittens,
  setUsers,
  user: { id: userUid },
  users,
}) => {
  const [isRefreshing, setIsRefreshing] = useDebouncedState<boolean>(
    true,
    DEBOUNCE_TIMEOUT,
  )

  const navigation = useNavigation()

  const updateUsers = useCallback(
    async (id) => {
      if (!users[id]) {
        const user = new User({ id })
        await user.get()
        setUsers({ ...users, [id]: user.toJSON() })
      }
    },
    [setUsers, users],
  )

  const updateLittens = useCallback(
    async (id) => {
      if (!littens[id]) {
        const litten = new Litten({ id })
        await litten.get()
        setLittens({ ...littens, [id]: litten.toJSON() })
      }
    },
    [littens, setLittens],
  )

  const updateChats = useCallback(
    (querySnapshot, error) => {
      if (!querySnapshot || error) {
        debugLog(error)
      } else if (!querySnapshot.empty) {
        const userChats = []

        querySnapshot.forEach((documentSnapshot) => {
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
      }

      setIsRefreshing(false)
    },
    [setChats, setIsRefreshing, updateLittens, updateUsers],
  )

  useEffect(() => {
    const subscriber = Chat.subscribeForUser(userUid).onSnapshot(updateChats)

    return () => subscriber()
  }, [updateChats, updateLittens, updateUsers, userUid])

  const deleteConversation = async (chatObj) => {
    const chat = new Chat(chatObj)
    await chat.deleteForUser(userUid)
  }

  const confirmDeleteConversation = (chat) => {
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
  }

  const hiddenOptions = [
    {
      key: 'HIDDEN_OPTION_DELETE',
      label: translate('cta.delete'),
      onPress: confirmDeleteConversation,
      style: { backgroundColor: 'red' },
    },
  ]

  const renderItem = ({ item: chat }) => {
    const {
      key,
      lastMessage,
      littenSpecies,
      littenType,
      littenUid,
      metadata,
      participants,
    } = chat
    const recipientUid = participants.find((id) => id !== userUid)
    const recipient = users[recipientUid]
    const litten = littens[littenUid]
    const species = getFromListByKey(littenSpeciesList, littenSpecies)
    const type = getFromListByKey(littenTypes, littenType)
    const header =
      litten?.title && species && type
        ? translate('screens.messages.littenTitle', {
            species: species?.labelOne,
            title: litten?.title,
            type: type?.label,
          })
        : translate('screens.messages.littenRemoved')
    const updatedAtSeconds = metadata?.updatedAt?.seconds
    const updatedAt = updatedAtSeconds
      ? updatedAtSeconds * 1000
      : updatedAtSeconds

    return (
      <UIMessage.Preview
        key={key}
        from={shortenName(recipient?.displayName)}
        header={header}
        lastActivity={updatedAt}
        onPress={() =>
          navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
            chat,
            recipient,
            litten,
          })
        }
        read={true}>
        {lastMessage}
      </UIMessage.Preview>
    )
  }

  const renderHiddenItem = ({ item: { read, ...otherProps } }) => (
    <UIMessage.Hidden read={true}>
      {hiddenOptions.map(
        ({ key, label, onPress: onHiddenItemPress, style }) => (
          <UIMessage.HiddenItem
            onPress={() => onHiddenItemPress({ read, ...otherProps })}
            style={style}
            key={key}>
            {label}
          </UIMessage.HiddenItem>
        ),
      )}
    </UIMessage.Hidden>
  )

  if (isRefreshing) {
    return <UILoader active={isRefreshing} />
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
      ListEmptyComponent={
        <Empty
          imageSource={placeholderEmptyMessages}
          header={translate('screens.messages.emptyTitle')}>
          {translate('screens.messages.emptyText')}
        </Empty>
      }
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
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
