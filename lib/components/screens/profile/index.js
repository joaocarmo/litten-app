/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { UIAvatar, UIImage } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ProfileMainScreen from 'screens/profile/main'
import { placeholderUser, iconSettings } from 'images'
import { shortenName } from 'utils/functions'
import {
  SCREEN_PROFILE_EDIT,
  SCREEN_USER_PROFILE,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH,
} from 'utils/constants'
import colors from 'styles/colors'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'

type OwnProps = {}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type DispatchProps = null
type ProfileProps = {
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = null

const ProfileIndexScreen: (args: any) => React$Node = ({
  authenticatedUser,
}) => {
  const { extra: user } = authenticatedUser
  const { displayName = 'User', photoURL = null } = user

  const navigation = useNavigation()

  return (
    <ScreenTemplate
      header={
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.navigate(SCREEN_USER_PROFILE, {
                user,
              })
            }
            style={styles.imageContainer}>
            <UIAvatar source={photoURL ? { uri: photoURL } : placeholderUser} />
          </Pressable>
          <Text
            style={styles.headerText}
            numberOfLines={1}
            ellipsizeMode="middle">
            {shortenName(displayName)}
          </Text>
          <Pressable
            onPress={() => navigation.navigate(SCREEN_PROFILE_EDIT)}
            style={styles.imageContainer}>
            <UIImage source={iconSettings} style={styles.editIcon} />
          </Pressable>
        </View>
      }>
      <ProfileMainScreen />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    width: STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  editIcon: {
    flex: 1,
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
})

export default connect<
  ProfileProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileIndexScreen)
