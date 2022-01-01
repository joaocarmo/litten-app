import dayjs from '@utils/day'
import { View } from 'react-native'
import { useTheme } from '@hooks'
import { UIAvatar, UIHeader, UIIcon, UIText } from '@ui-elements'
import { placeholderUser } from '@images'
import { getFromListByKey, shortenName } from '@utils/functions'
import { contactOptions } from '@utils/litten'
import { PLACEHOLDER_USER_DISPLAY_NAME } from '@utils/constants'
import { translate } from '@utils/i18n'

const UserProfileDetailsScreen = ({ user = {} }) => {
  const {
    contactPreferences = [],
    displayName,
    isOrganization,
    metadata: { createdAt: { seconds } = {} } = {},
    photoURL,
  } = user
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    viewProfileContainer: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 32,
    },
    viewProfileLeft: {
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    viewContactPreference: {
      flexDirection: 'row',
      marginTop: 4,
      paddingLeft: 8,
    },
    viewProfileRight: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    viewAvatar: {
      backgroundColor: theme.colors.background,
    },
    viewIconStyle: {
      marginRight: 8,
    },
  }))
  const memberSince = seconds ? seconds * 1000 : undefined
  const userType = isOrganization
    ? translate('screens.profile.viewUserTypeOrganization')
    : translate('screens.profile.viewUserTypeIndividual')

  const getIcon = (key) => getFromListByKey(contactOptions, key)?.icon

  const renderContactPreference = (contactPreference) => {
    const IconComponent = getIcon(contactPreference)
    return (
      <UIIcon
        key={contactPreference}
        IconComponent={IconComponent}
        size="mini"
        circle
        style={styles.viewIconStyle}
      />
    )
  }

  return (
    <>
      <View style={styles.viewProfileContainer}>
        <View style={styles.viewProfileLeft}>
          <UIHeader numberOfLines={1}>
            {shortenName(displayName) || PLACEHOLDER_USER_DISPLAY_NAME}
          </UIHeader>
          <UIText small>{userType}</UIText>
          <UIText>
            {translate('screens.profile.viewMemberSince', {
              memberSince: dayjs(memberSince).fromNow(),
            })}
          </UIText>
          <View style={styles.viewContactPreference}>
            {contactPreferences.map(renderContactPreference)}
          </View>
        </View>
        <View style={styles.viewProfileRight}>
          <UIAvatar
            size="medium"
            source={photoURL || placeholderUser}
            style={styles.viewAvatar}
          />
        </View>
      </View>
      <UIHeader subheader>
        {translate('screens.profile.viewPostsByUser')}
      </UIHeader>
    </>
  )
}

export default UserProfileDetailsScreen
