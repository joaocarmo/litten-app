/**
 * @format
 * @flow
 */

import { StyleSheet, View } from 'react-native'
import { UIAvatar, UIHeader, UISeparator } from 'ui-elements'
import { placeholderCat } from 'images'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const EmptyChat: (args: any) => React$Node = ({
  litten: { title: name, photos = [] },
}) => {
  const [firstPhoto = placeholderCat] = photos

  return (
    <View style={styles.emptyChatContainer}>
      <UIHeader thin style={styles.emptyChatText}>
        {translate('screens.messages.emptyChatTitle1')}
        <UIHeader>
          {translate('screens.messages.emptyChatTitle2', { name })}
        </UIHeader>
        {translate('screens.messages.emptyChatTitle3')}
      </UIHeader>
      <UISeparator invisible />
      <UIAvatar
        source={
          typeof firstPhoto === 'string' ? { uri: firstPhoto } : firstPhoto
        }
        size="large"
        containerStyle={styles.emptyChatAvatarContainer}
        style={styles.emptyChatAvatar}
      />
      <UISeparator invisible />
      <UIHeader thin subheader style={styles.emptyChatText}>
        {translate('screens.messages.emptyChatTitle4')}
      </UIHeader>
    </View>
  )
}

const styles = StyleSheet.create({
  emptyChatContainer: {
    flexGrow: 1,
    maxWidth: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // For some reason, this is rendered upside-down
    transform: [{ rotateX: '180deg' }],
  },
  emptyChatText: {
    textAlign: 'center',
  },
  emptyChatAvatarContainer: {
    borderWidth: 6,
    borderColor: colors.blue,
  },
  emptyChatAvatar: {
    height: '95%',
    width: '95%',
    backgroundColor: colors.lighterGray,
  },
})

export default EmptyChat
