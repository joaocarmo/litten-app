/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { iconHeart, iconHeartOutline } from 'images'
import colors from 'styles/colors'

const readIndicatorSize = 10
const favIndicatorImageSize = 0.7 * readIndicatorSize

const UIMessagePreview: (args: any) => React$Node = ({
  children,
  favourite = false,
  from,
  onPress,
  read = true,
  style,
  subject,
  timestamp,
  ...otherProps
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.uiMessagePreviewContainer}>
      <View {...otherProps} style={styles.uiMessagePreviewLine}>
        <Text numberOfLines={1} style={styles.uiMessagePreviewSubject}>
          {subject}
        </Text>
        <View style={styles.uiMessagePreviewLineLeft}>
          <Text style={styles.uiMessagePreviewLineTimestamp}>{timestamp}</Text>
          <View style={read ? readIndicatorStyle : unreadIndicatorStyle} />
        </View>
      </View>
      <View {...otherProps} style={styles.uiMessagePreviewLine}>
        <Text style={styles.uiMessagePreviewFrom}>{`@${from}`}</Text>
        <Text numberOfLines={1} style={styles.uiMessagePreviewText}>
          {children}
        </Text>
        <View style={favIndicatorStyle}>
          <Image
            source={favourite ? iconHeart : iconHeartOutline}
            resizeMode="contain"
            style={styles.favIndicatorImage}
          />
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  uiMessagePreviewContainer: {
    height: 52,
    width: '100%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  uiMessagePreviewLine: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uiMessagePreviewLineLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  uiMessagePreviewLineTimestamp: {
    fontSize: 12,
    fontWeight: '200',
    color: colors.black,
  },
  uiMessagePreviewLineRead: {
    height: readIndicatorSize,
    width: readIndicatorSize,
    borderRadius: readIndicatorSize / 2,
    marginLeft: 12,
    backgroundColor: colors.darkGray,
  },
  uiMessagePreviewLineUnread: {
    backgroundColor: colors.purple,
  },
  uiMessagePreviewLineFav: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  favIndicatorImage: {
    height: favIndicatorImageSize,
    width: favIndicatorImageSize,
  },
  uiMessagePreviewSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  uiMessagePreviewFrom: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
    color: colors.black,
  },
  uiMessagePreviewText: {
    flex: 1,
    fontSize: 12,
    color: colors.black,
  },
})

const readIndicatorStyle = styles.uiMessagePreviewLineRead
const unreadIndicatorStyle = StyleSheet.compose(
  readIndicatorStyle,
  styles.uiMessagePreviewLineUnread,
)
const favIndicatorStyle = StyleSheet.compose(
  readIndicatorStyle,
  styles.uiMessagePreviewLineFav,
)

export default UIMessagePreview
