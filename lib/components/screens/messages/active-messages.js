/**
 * @format
 * @flow
 */

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { UIMessage } from 'ui-elements'
import { SCREEN_MESSAGE_PRIVATE, UI_HIDDEN_OPTION_WIDTH } from 'utils/constants'
import { translate } from 'utils/i18n'
import { user as fakeUser } from 'data/fake'

const activeMessages = [
  {
    key: 'one',
    from: fakeUser,
    favourite: false,
    read: true,
    lastMessage: {
      message: 'Hello there !',
      timestamp: 'Last message on 07/08/2020',
    },
    litten: {
      title: 'Cat: Anakin Catwalker',
    },
  },
]

const ActiveMessages: (args: any) => React$Node = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const navigation = useNavigation()

  const deleteConversation = (from) => {
    Alert.alert(
      translate('cta.deleteConversation'),
      translate('feedback.confirmMessages.deleteConversation', {
        user: from?.name,
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

  const renderItem = ({
    item: { favourite, from, key, lastMessage, litten, read },
  }) => (
    <UIMessage.Preview
      key={key}
      from={from.name}
      header={litten.title}
      read={read}
      favourite={favourite}
      onPress={() =>
        navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
          title: from.name,
          subTitle: lastMessage.timestamp,
          conversationUser: from,
          conversationID: key,
        })
      }>
      {lastMessage.message}
    </UIMessage.Preview>
  )

  const renderHiddenItem = ({ item: { from } }) => (
    <UIMessage.Hidden>
      {hiddenOptions.map(
        ({ key, label, onPress: onHiddenItemPress, style }) => (
          <UIMessage.HiddenItem
            onPress={() => onHiddenItemPress(from)}
            style={style}
            key={key}>
            {label}
          </UIMessage.HiddenItem>
        ),
      )}
    </UIMessage.Hidden>
  )

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }

  return (
    <SwipeListView
      refreshing={isRefreshing}
      data={activeMessages}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      onRefresh={handleOnRefresh}
      rightOpenValue={-(hiddenOptions.length * UI_HIDDEN_OPTION_WIDTH)}
      friction={100}
      disableRightSwipe
    />
  )
}

export default ActiveMessages
