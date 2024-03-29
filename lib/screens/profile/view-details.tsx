import { useMemo } from 'react'
import { View } from 'react-native'
import dayjs from '@utils/day'
import { useTheme } from '@hooks'
import { UIAvatar, UIHeader, UIIcon, UIText } from '@ui-elements'
import { getFromListByKey, shortenName } from '@utils/functions'
import { contactOptions } from '@utils/litten'
import {
  DEFAULT_CONTACT_PREFERENCES,
  PLACEHOLDER_USER_DISPLAY_NAME,
} from '@utils/constants'
import { translate } from '@utils/i18n'
import type { BasicUser } from '@model/types/user'

export type UserProfileDetailsScreenProps = { user: BasicUser }

const UserProfileDetailsScreen = ({ user }: UserProfileDetailsScreenProps) => {
  const { createStyles } = useTheme()

  const {
    contactPreferences,
    displayName,
    isOrganization,
    metadata: {
      createdAt: { seconds },
    },
    photoURL,
  } = {
    contactPreferences: DEFAULT_CONTACT_PREFERENCES,
    displayName: '',
    isOrganization: false,
    metadata: { createdAt: { seconds: 0 } },
    photoURL: '',
    ...user,
  }
  const contactPreferencesEnabled = useMemo(
    () =>
      Object.entries(contactPreferences)
        .map(([k, v]) => v && k)
        .filter(Boolean),
    [contactPreferences],
  )

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

  const getIcon = (key: string) => getFromListByKey(contactOptions, key)?.icon

  const renderContactPreference = (contactPreference: string) => {
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
            {contactPreferencesEnabled.map(renderContactPreference)}
          </View>
        </View>
        <View style={styles.viewProfileRight}>
          <UIAvatar size="medium" source={photoURL} style={styles.viewAvatar} />
        </View>
      </View>
      <UIHeader subheader>
        {translate('screens.profile.viewPostsByUser')}
      </UIHeader>
    </>
  )
}

export default UserProfileDetailsScreen
