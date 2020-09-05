/**
 * @format
 * @flow
 */

import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { UIMessagePreview } from 'ui-elements'
import { SCREEN_MESSAGE_PRIVATE } from 'utils/constants'

const ipsumLorem = `\
It is a long established fact that a reader will be distracted by 
the readable content of a page when looking at its layout. The 
point of using Lorem Ipsum is that it has a more-or-less normal 
distribution of letters, as opposed to using 'Content here, 
content here', making it look like readable English. Many desktop 
publishing packages and web page editors now use Lorem Ipsum as 
their default model text, and a search for 'lorem ipsum' will 
uncover many web sites still in their infancy. Various versions 
have evolved over the years, sometimes by accident, sometimes on 
purpose (injected humour and the like). \
`

const activeMessages = [
  {
    key: 'one',
    from: 'johnnyeyelash',
  },
  {
    key: 'two',
    from: 'johnnyeyelash',
  },
  {
    key: 'three',
    from: 'johnnyeyelash',
  },
  {
    key: 'four',
    from: 'johnnyeyelash',
  },
  {
    key: 'five',
    from: 'johnnyeyelash',
  },
  {
    key: 'six',
    from: 'johnnyeyelash',
  },
]

const ActiveMessages: (args: any) => React$Node = () => {
  const navigation = useNavigation()

  return (
    <>
      {activeMessages.map(({ key, from }, idx) => (
        <UIMessagePreview
          key={key}
          from={from}
          header="Cat: Snowball"
          read={idx % 4}
          favourite={!(idx % 5)}
          onPress={() =>
            navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
              title: from,
              conversationID: key,
            })
          }>
          {ipsumLorem}
        </UIMessagePreview>
      ))}
    </>
  )
}

export default ActiveMessages
