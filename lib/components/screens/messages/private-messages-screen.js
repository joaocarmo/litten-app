/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, Pressable, StyleSheet, View, Text } from 'react-native'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import PrivateMessages from './private-messages'
import { iconMoreOptions } from 'images'
import colors from 'styles/colors'

const avatarSize = 36
const moreOptionsSize = 18

const MessagePrivate: (args: any) => React$Node = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: route?.params?.conversationUser?.avatar }}
            style={styles.avatar}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.username}>{`@${route?.params?.title}`}</Text>
            <Text style={styles.timestamp}>{route?.params?.subTitle}</Text>
          </View>
          <Pressable
            style={styles.moreOptionsPressable}
            onPress={route?.params?.onPressConvertationOptions}>
            <Image
              source={iconMoreOptions}
              style={styles.moreOptions}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </ScreenSimpleHeaderTemplate>
    }
    behavior={null}
    scrollable={false}
    style={styles.messagesContainer}>
    <PrivateMessages conversationID={route?.params?.conversationID} />
  </ScreenTemplate>
)

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
    alignSelf: 'flex-start',
    marginLeft: avatarSize / 2,
    marginRight: avatarSize / 3,
  },
  username: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  timestamp: {
    flex: 1,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },
  moreOptionsPressable: {
    height: avatarSize,
    width: avatarSize,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  moreOptions: {
    height: moreOptionsSize,
  },
})

export default MessagePrivate
