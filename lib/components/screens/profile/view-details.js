/**
 * @format
 * @flow
 */

import dayjs from 'utils/day'
import { View, StyleSheet } from 'react-native'
import { UIAvatar, UIHeader, UIIcon, UIText } from 'ui-elements'
import { placeholderUser } from 'images'
import { getFromListByKey, shortenName } from 'utils/functions'
import { contactOptions } from 'utils/litten'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UserProfileDetailsScreen: (args: any) => React$Node = ({ user = {} }) => {
  const {
    contactPreferences = [],
    displayName = 'User',
    isOrganization,
    metadata: { createdAt: { seconds } = {} } = {},
    photoURL,
  } = user
  const memberSince = seconds ? seconds * 1000 : undefined
  const userType = isOrganization
    ? translate('screens.profile.viewUserTypeOrganization')
    : translate('screens.profile.viewUserTypeIndividual')

  const getIcon = (key) => getFromListByKey(contactOptions, key)?.icon
  const renderContactPreference = (contactPreference) => {
    const icon = getIcon(contactPreference)

    return (
      <UIIcon
        key={contactPreference}
        icon={icon}
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
          <UIHeader numberOfLines={1}>{shortenName(displayName)}</UIHeader>
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
            source={photoURL ? { uri: photoURL } : placeholderUser}
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

const styles = StyleSheet.create({
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
  },
  viewProfileRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  viewAvatar: {
    backgroundColor: colors.white,
  },
  viewIconStyle: {
    marginRight: 8,
  },
})

export default UserProfileDetailsScreen
