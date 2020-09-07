/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIMessagePreview } from 'ui-elements'
import { SCREEN_MESSAGE_PRIVATE } from 'utils/constants'

const otherUser = {
  _id: 2,
  name: 'Obi-Wan Kenobi',
  avatar: 'https://placeimg.com/140/140/any',
}

const activeMessages = [
  {
    key: 'one',
    from: otherUser,
    favourite: false,
    read: true,
    lastMessage: {
      message: 'Hello there !',
      timestamp: 'Last message on 07/08/2020',
    },
    litten: {
      title: 'Cat: Anakin Catwalker',
    },
    onPressConvertationOptions: () => console.warn('touch me not !'),
  },
]

const ActiveMessages: (args: any) => React$Node = () => {
  const navigation = useNavigation()

  return (
    <>
      {activeMessages.map(
        (
          {
            favourite,
            from,
            key,
            lastMessage,
            litten,
            onPressConvertationOptions,
            read,
          },
          idx,
        ) => (
          <UIMessagePreview
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
                onPressConvertationOptions,
              })
            }>
            {lastMessage.message}
          </UIMessagePreview>
        ),
      )}
    </>
  )
}

export default ActiveMessages
