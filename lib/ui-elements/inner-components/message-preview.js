/**
 * @format
 * @flow
 */

import { memo, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import dayjs from 'utils/day'
import UIListItem from 'ui-elements/list-item'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

export type UIMessagePreviewProps = {
  children: string,
  from: string,
  header: string,
  lastActivity: number,
  read: boolean,
  ...
}

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.from === nextProps.from &&
    prevProps.header === nextProps.header &&
    dayjs(prevProps.lastActivity).fromNow() ===
      dayjs(nextProps.lastActivity).fromNow() &&
    prevProps.read === nextProps.read
  )
}

const UIMessagePreview: (props: UIMessagePreviewProps) => React$Node = ({
  children,
  from,
  header,
  lastActivity,
  read = true,
  ...otherProps
}) => {
  const messageUnreadStyle = useMemo(
    () => (read ? undefined : styles.uiMessagePreviewTextUnread),
    [read],
  )

  return (
    <UIListItem {...{ ...otherProps, selected: !read }}>
      <View style={styles.uiMessagePreviewContentMainContainer}>
        <View style={styles.uiMessagePreviewHeader}>
          <Text
            numberOfLines={1}
            style={[
              styles.uiMessagePreviewText,
              styles.uiMessagePreviewTitle,
              messageUnreadStyle,
            ]}>
            {header}
          </Text>
          {lastActivity && (
            <Text
              numberOfLines={1}
              style={[
                styles.uiMessagePreviewMessage,
                styles.uiMessagePreviewLastActivity,
                messageUnreadStyle,
              ]}>
              {dayjs(lastActivity).fromNow()}
            </Text>
          )}
        </View>
        <View style={styles.uiMessagePreviewMessageContainer}>
          <Text
            numberOfLines={1}
            style={[styles.uiMessagePreviewMessage, messageUnreadStyle]}>
            {children}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.uiMessagePreviewFrom, messageUnreadStyle]}>
            {from}
          </Text>
        </View>
      </View>
    </UIListItem>
  )
}

const styles = StyleSheet.create({
  uiMessagePreviewUnread: {
    backgroundColor: colors.purple,
  },
  uiMessagePreviewContentMainContainer: {
    flex: 1,
  },
  uiMessagePreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uiMessagePreviewMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
  },
  uiMessagePreviewText: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    color: colors.black,
    paddingBottom: 3,
  },
  uiMessagePreviewTextUnread: {
    color: colors.white,
  },
  uiMessagePreviewTitle: {
    fontWeight: fontWeight.bolder,
  },
  uiMessagePreviewFrom: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.bolder,
    color: colors.black,
  },
  uiMessagePreviewMessage: {
    flex: 1,
    fontSize: fontSize.small,
    fontWeight: fontWeight.lighter,
    color: colors.black,
  },
  uiMessagePreviewLastActivity: {
    textAlign: 'right',
  },
})

export default (memo<UIMessagePreviewProps>(
  UIMessagePreview,
  areEqual,
): React$AbstractComponent<UIMessagePreviewProps, mixed>)
