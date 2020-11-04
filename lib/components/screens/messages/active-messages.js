/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import Chat from 'model/chat'
import Litten from 'model/litten'
import User from 'model/user'
import { UIMessage } from 'ui-elements'
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

  const chat = useRef(new Chat({})).current

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
      const subscriber = chat
        .subscribeForUser(userUid)
        .onSnapshot((querySnapshot) => {
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
        })

      return () => subscriber()
    }
  }, [chat, updateLittens, updateUsers, userUid])

  const deleteConversation = (recipient) => {
    Alert.alert(
      translate('cta.deleteConversation'),
      translate('feedback.confirmMessages.deleteConversation', {
        user: recipient?.displayName,
      }),
      [
        {
          text: translate('cta.yes'),
          onPress: () => null,
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
      onPress: deleteConversation,
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

    return (
      <UIMessage.Preview
        key={key}
        from={shortenName(recipient?.displayName)}
        header={translate('screens.messages.littenTitle', {
          species: species?.labelOne,
          title: litten?.title,
          type: type?.label,
        })}
        onPress={() =>
          navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
            chat: item,
            recipient,
            litten,
          })
        }
        read>
        {lastMessage}
      </UIMessage.Preview>
    )
  }

  const renderHiddenItem = ({ item: { participants } }) => (
    <UIMessage.Hidden>
      {hiddenOptions.map(
        ({ key, label, onPress: onHiddenItemPress, style }) => (
          <UIMessage.HiddenItem
            onPress={() => onHiddenItemPress(participants)}
            style={style}
            key={key}>
            {label}
          </UIMessage.HiddenItem>
        ),
      )}
    </UIMessage.Hidden>
  )

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
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveMessages)
