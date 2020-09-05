/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet } from 'react-native'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import PrivateMessages from './private-messages'
import colors from 'styles/colors'

const MessagePrivate: (args: any) => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {route?.params?.title}
      </ScreenSimpleHeaderTemplate>
    }
    behavior={null}
    scrollable={false}
    style={styles.messagesContainer}>
    <PrivateMessages conversationID={route?.params?.conversationID} />
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default MessagePrivate
