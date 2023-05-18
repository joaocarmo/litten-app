import { memo, useMemo } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@hooks'
import dayjs from '@utils/day'
import UIListItem from '@ui-elements/list-item'
import type { UIListItemProps } from '@ui-elements/list-item'
import messagePreviewComponentStyles from '@ui-elements/inner-components/message-preview.styles'

export type UIMessagePreviewProps = {
  children: string
  from: string
  header: string
  lastActivity: number
  read: boolean
} & UIListItemProps

const areEqual = (prevProps, nextProps) =>
  prevProps.children === nextProps.children &&
  prevProps.from === nextProps.from &&
  prevProps.header === nextProps.header &&
  dayjs(prevProps.lastActivity).fromNow() ===
    dayjs(nextProps.lastActivity).fromNow() &&
  prevProps.read === nextProps.read

const UIMessagePreview = ({
  children,
  from,
  header,
  lastActivity,
  read = true,
  ...otherProps
}: UIMessagePreviewProps) => {
  const { createStyles } = useTheme()

  const styles = createStyles(messagePreviewComponentStyles)

  const messageUnreadStyle = useMemo(
    () => (read ? undefined : styles.uiMessagePreviewTextUnread),
    [read, styles.uiMessagePreviewTextUnread],
  )

  return (
    <UIListItem selected={!read} {...otherProps}>
      <View style={styles.uiMessagePreviewContentMainContainer}>
        <View style={styles.uiMessagePreviewHeader}>
          <Text
            numberOfLines={1}
            style={[
              styles.uiMessagePreviewText,
              styles.uiMessagePreviewTitle,
              messageUnreadStyle,
            ]}
          >
            {header}
          </Text>
          {lastActivity && (
            <Text
              numberOfLines={1}
              style={[
                styles.uiMessagePreviewMessage,
                styles.uiMessagePreviewLastActivity,
                messageUnreadStyle,
              ]}
            >
              {dayjs(lastActivity).fromNow()}
            </Text>
          )}
        </View>
        <View style={styles.uiMessagePreviewMessageContainer}>
          <Text
            numberOfLines={1}
            style={[styles.uiMessagePreviewMessage, messageUnreadStyle]}
          >
            {children}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.uiMessagePreviewFrom, messageUnreadStyle]}
          >
            {from}
          </Text>
        </View>
      </View>
    </UIListItem>
  )
}

export default memo(UIMessagePreview, areEqual)
