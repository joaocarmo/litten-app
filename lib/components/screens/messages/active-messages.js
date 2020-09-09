/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIMessagePreview } from 'ui-elements'
import { SCREEN_MESSAGE_PRIVATE } from 'utils/constants'
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
  const navigation = useNavigation()

  return (
    <>
      {activeMessages.map(
        ({ favourite, from, key, lastMessage, litten, read }, idx) => (
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
