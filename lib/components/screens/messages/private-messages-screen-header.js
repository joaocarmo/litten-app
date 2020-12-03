/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { UIAvatar } from 'ui-elements'
import { ChatOptions } from './inner-components'
import { placeholderUser } from 'images'
import { getFromListByKey, shortenName } from 'utils/functions'
import { USER_AVATAR_SIZE_MINI } from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const MessagePrivateHeader: (args: any) => React$Node = (props) => {
  const { litten, recipient } = props
  const species = getFromListByKey(littenSpeciesList, litten.species)
  const type = getFromListByKey(littenTypes, litten.type)
  const subtitle =
    litten?.title && species && type
      ? translate('screens.messages.littenTitle', {
          species: species?.labelOne,
          title: litten?.title,
          type: type?.label,
        })
      : translate('screens.messages.littenRemoved')

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
            {shortenName(recipient.displayName)}
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

const styles = StyleSheet.create({
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
    backgroundColor: colors.lightGray,
  },
  avatarContainer: {
    marginRight: USER_AVATAR_SIZE_MINI / 3,
  },
  title: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },
  conversationOptions: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

export default MessagePrivateHeader
