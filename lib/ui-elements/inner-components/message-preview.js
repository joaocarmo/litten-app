/**
 * @format
 * @flow
 */

import { memo, useMemo } from 'react'
import type { Node } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'hooks'
import dayjs from 'utils/day'
import UIListItem from 'ui-elements/list-item'

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

const UIMessagePreview: (props: UIMessagePreviewProps) => Node = ({
  children,
  from,
  header,
  lastActivity,
  read = true,
  ...otherProps
}) => {
  const { createStyles, typography } = useTheme()

  const styles = createStyles((theme) => ({
    uiMessagePreviewUnread: {
      backgroundColor: theme.colors.primary,
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
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.regular,
      color: theme.colors.text,
      paddingBottom: 3,
    },
    uiMessagePreviewTextUnread: {
      color: theme.colors.textAlt,
    },
    uiMessagePreviewTitle: {
      fontWeight: typography.fontWeight.bolder,
    },
    uiMessagePreviewFrom: {
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.text,
    },
    uiMessagePreviewMessage: {
      flex: 1,
      fontSize: typography.fontSize.small,
      fontWeight: typography.fontWeight.lighter,
      color: theme.colors.text,
    },
    uiMessagePreviewLastActivity: {
      textAlign: 'right',
    },
  }))

  const messageUnreadStyle = useMemo(
    () => (read ? undefined : styles.uiMessagePreviewTextUnread),
    [read, styles.uiMessagePreviewTextUnread],
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

export default (memo<UIMessagePreviewProps>(
  UIMessagePreview,
  areEqual,
): React$AbstractComponent<UIMessagePreviewProps, mixed>)
