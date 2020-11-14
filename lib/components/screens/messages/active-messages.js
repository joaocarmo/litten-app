/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Chat from 'model/chat'
import Litten from 'model/litten'
import User from 'model/user'
import Empty from 'components/empty'
import { placeholderEmptyMessages } from 'images'
import { UIMessage, UILoader } from 'ui-elements'
import { getFromListByKey, shortenName } from 'utils/functions'
import { SCREEN_MESSAGE_PRIVATE, UI_HIDDEN_OPTION_WIDTH } from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = () => ({})

const ActiveMessages: (args: any) => React$Node = ({
  user: { id: userUid },
}) => {
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState({})
  const [littens, setLittens] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(true)

  const navigation = useNavigation()

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }

  const updateUsers = useCallback(
    async (id) => {
      if (!users[id]) {
        const user = new User({ id })
        await user.get()
        setUsers({ ...users, [id]: user.toJSON() })
      }
    },
    [users],
  )

  const updateLittens = useCallback(
    async (id) => {
      if (!littens[id]) {
        const litten = new Litten({ id })
        await litten.get()
        setLittens({ ...littens, [id]: litten.toJSON() })
      }
    },
    [littens],
  )

  useEffect(() => {
    if (userUid) {
      const subscriber = Chat.subscribeForUser(userUid).onSnapshot(
        (querySnapshot) => {
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
          setIsRefreshing(false)
        },
      )

      return () => subscriber()
    }
  }, [updateLittens, updateUsers, userUid])

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
        user: recipient?.displayName,
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
        { cancelable: false },
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

  const renderItem = ({ item }) => {
    const {
      key,
      lastMessage,
      littenUid,
      littenSpecies,
      littenType,
      participants,
    } = item
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

    return (
      <UIMessage.Preview
        key={key}
        from={shortenName(recipient?.displayName)}
        header={header}
        onPress={() =>
          navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
            chat: item,
            recipient,
            litten,
            userUid,
          })
        }
        read>
        {lastMessage}
      </UIMessage.Preview>
    )
  }

  const renderHiddenItem = ({ item }) => (
    <UIMessage.Hidden>
      {hiddenOptions.map(
        ({ key, label, onPress: onHiddenItemPress, style }) => (
          <UIMessage.HiddenItem
            onPress={() => onHiddenItemPress(item)}
            style={style}
            key={key}>
            {label}
          </UIMessage.HiddenItem>
        ),
      )}
    </UIMessage.Hidden>
  )

  if (isRefreshing && !chats.length) {
    return <UILoader active={isRefreshing} />
  }

  return (
    <SwipeListView
      refreshing={isRefreshing}
      data={chats}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      onRefresh={handleOnRefresh}
      rightOpenValue={-(hiddenOptions.length * UI_HIDDEN_OPTION_WIDTH)}
      friction={100}
      disableRightSwipe
      ListEmptyComponent={
        <Empty
          imageSource={placeholderEmptyMessages}
          header={translate('screens.messages.emptyTitle')}>
          {translate('screens.messages.emptyText')}
        </Empty>
      }
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveMessages)
