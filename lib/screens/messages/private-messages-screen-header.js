/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'hooks'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { UIAvatar } from 'ui-elements'
import { ChatOptions } from 'screens/messages/inner-components'
import { placeholderUser } from 'images'
import { littenToHeaderTitle, shortenName } from 'utils/functions'
import {
  PLACEHOLDER_USER_DISPLAY_NAME,
  USER_AVATAR_SIZE_MINI,
} from 'utils/constants'

const MessagePrivateHeader: (args: any) => Node = (props) => {
  const { litten, recipient } = props

  const { createStyles } = useTheme()

  const styles = createStyles((theme, typography) => ({
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      top: USER_AVATAR_SIZE_MINI / 7,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    messagesContainer: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
    avatarContainer: {
      marginRight: USER_AVATAR_SIZE_MINI / 3,
    },
    title: {
      textAlign: 'left',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.textAlt,
    },
    subtitle: {
      textAlign: 'left',
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.light,
      color: theme.colors.textAlt,
    },
    conversationOptions: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  }))

  const subtitle = littenToHeaderTitle(litten)

  return (
    <ScreenSimpleHeaderTemplate withGoBack>
      <View style={styles.headerContainer}>
        <UIAvatar
          source={
            recipient?.photoURL ? { uri: recipient.photoURL } : placeholderUser
          }
          containerStyle={styles.avatarContainer}
        />
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {shortenName(recipient?.displayName) ||
              PLACEHOLDER_USER_DISPLAY_NAME}
          </Text>
          <Text numberOfLines={1} style={styles.subtitle}>
            {subtitle}
          </Text>
        </View>
        <View style={styles.conversationOptions}>
          <ChatOptions {...props} />
        </View>
      </View>
    </ScreenSimpleHeaderTemplate>
  )
}

export default MessagePrivateHeader
