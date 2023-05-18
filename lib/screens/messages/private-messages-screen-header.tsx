import type { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@hooks'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'
import { UIAvatar } from '@ui-elements'
import { ChatOptions } from '@screens/messages/inner-components'
import { littenToHeaderTitle, shortenName } from '@utils/functions'
import { PLACEHOLDER_USER_DISPLAY_NAME } from '@utils/constants'
import messagePrivateHeaderComponentStyles from '@screens/messages/private-messages-screen-header.styles'
import { ChatOptionsProps } from './inner-components/chat-options'

const MessagePrivateHeader: FC<ChatOptionsProps> = (props) => {
  const { litten, recipient } = props
  const { createStyles } = useTheme()

  const styles = createStyles(messagePrivateHeaderComponentStyles)

  const subtitle = littenToHeaderTitle(litten)

  return (
    <ScreenSimpleHeaderTemplate withGoBack>
      <View style={styles.headerContainer}>
        <UIAvatar
          source={recipient?.photoURL}
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
