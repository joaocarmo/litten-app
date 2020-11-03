/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import UIListItem from '../list-item'
import colors from 'styles/colors'

const UIMessagePreview: (args: any) => React$Node = ({
  children,
  from,
  header,
  onPress,
  read = false,
  noFeedback = true,
  ...otherProps
}) => (
  <UIListItem
    noFeedback={noFeedback}
    onPress={onPress}
    selected={!read}
    {...otherProps}>
    <View style={styles.uiMessagePreviewContentMainContainer}>
      <Text
        style={
          read ? styles.uiMessagePreviewText : uiMessagePreviewTextUnreadStyle
        }>
        {header}
      </Text>
      <View style={styles.uiMessagePreviewMessageContainer}>
        <Text
          numberOfLines={1}
          style={
            read ? styles.uiMessagePreviewFrom : uiMessagePreviewFromUnreadStyle
          }>
          {from}
        </Text>
        <Text
          numberOfLines={1}
          style={
            read
              ? styles.uiMessagePreviewMessage
              : uiMessagePreviewMessageUnreadStyle
          }>
          {children}
        </Text>
      </View>
    </View>
  </UIListItem>
)

const styles = StyleSheet.create({
  uiMessagePreviewUnread: {
    backgroundColor: colors.purple,
  },
  uiMessagePreviewContentMainContainer: {
    flex: 1,
  },
  uiMessagePreviewMessageContainer: {
    flexDirection: 'row',
    paddingTop: 3,
  },
  uiMessagePreviewText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    paddingBottom: 3,
  },
  uiMessagePreviewTextUnread: {
    color: colors.white,
  },
  uiMessagePreviewFrom: {
    fontSize: 12,
    marginRight: 6,
  },
  uiMessagePreviewMessage: {
    flex: 1,
    fontSize: 12,
    fontWeight: '200',
  },
})

const uiMessagePreviewTextUnreadStyle = StyleSheet.compose(
  styles.uiMessagePreviewText,
  styles.uiMessagePreviewTextUnread,
)

const uiMessagePreviewFromUnreadStyle = StyleSheet.compose(
  styles.uiMessagePreviewFrom,
  styles.uiMessagePreviewTextUnread,
)

const uiMessagePreviewMessageUnreadStyle = StyleSheet.compose(
  styles.uiMessagePreviewMessage,
  styles.uiMessagePreviewTextUnread,
)

export default UIMessagePreview
