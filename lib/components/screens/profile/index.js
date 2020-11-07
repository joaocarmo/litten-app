/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { UIAvatar, UIImage } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ProfileMainScreen from 'screens/profile/main'
import { iconSettings } from 'images'
import { shortenName } from 'utils/functions'
import { SCREEN_PROFILE_EDIT, SCREEN_USER_PROFILE } from 'utils/constants'
import colors from 'styles/colors'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

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
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate(SCREEN_USER_PROFILE, {
                user,
              })
            }>
            <UIAvatar
              source={photoURL ? { uri: photoURL } : null}
              containerStyle={styles.imageContainer}
            />
          </TouchableWithoutFeedback>
          <Text
            style={styles.headerText}
            numberOfLines={1}
            ellipsizeMode="middle">
            {shortenName(displayName)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREEN_PROFILE_EDIT)}>
            <View style={styles.imageContainer}>
              <UIImage source={iconSettings} style={styles.editIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      }>
      <ProfileMainScreen />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    width: vw(85),
    flexDirection: 'row',
    flexGrow: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndexScreen)
