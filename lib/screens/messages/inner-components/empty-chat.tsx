import { View } from 'react-native'
import { useTheme } from '@hooks'
import { UIAvatar, UIContainer, UIHeader, UISeparator } from '@ui-elements'
import { placeholderCat } from '@images'
import { translate } from '@utils/i18n'
import { littenTypesKeys } from '@utils/litten'

const EmptyChat = ({ litten: { photos = [], title: name, type } }) => {
  const [firstPhoto = placeholderCat] = photos
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    emptyChatContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // For some reason, this is rendered upside-down
      transform: [
        {
          rotateX: '180deg',
        },
      ],
    },
    emptyChatText: {
      textAlign: 'center',
    },
    emptyChatAvatarContainer: {
      borderWidth: 6,
      borderColor: theme.colors.secondary,
    },
    emptyChatAvatar: {
      height: '95%',
      width: '95%',
      backgroundColor: theme.colors.neutralLighter,
    },
  }))

  const typeKey = littenTypesKeys[type]

  return (
    <View style={styles.emptyChatContainer}>
      <UIContainer centered>
        <UIHeader thin style={styles.emptyChatText}>
          {translate(`screens.messages.${typeKey}.emptyChatTitle1`)}
          <UIHeader>
            {translate(`screens.messages.${typeKey}.emptyChatTitle2`, {
              name,
            })}
          </UIHeader>
          {translate(`screens.messages.${typeKey}.emptyChatTitle3`)}
        </UIHeader>
        <UISeparator invisible />
        <UIAvatar
          source={firstPhoto}
          size="large"
          containerStyle={styles.emptyChatAvatarContainer}
          style={styles.emptyChatAvatar}
        />
        <UISeparator invisible />
        <UIHeader thin subheader style={styles.emptyChatText}>
          {translate(`screens.messages.${typeKey}.emptyChatTitle4`)}
        </UIHeader>
      </UIContainer>
    </View>
  )
}

export default EmptyChat
