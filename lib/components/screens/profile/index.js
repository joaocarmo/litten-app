/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import ScreenTemplate from 'templates/screen'
import ProfileMainScreen from 'screens/profile/main'
import { iconSettings } from 'images'
import colors from 'styles/colors'
import { SCREEN_PROFILE_EDIT } from 'utils/constants'

const avatarSize = 36

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = () => ({})

const ProfileIndexScreen: (args: any) => React$Node = ({
  authenticatedUser: { basic: { displayName = 'User', photoURL = null } = {} },
}) => {
  const navigation = useNavigation()

  return (
    <ScreenTemplate
      header={
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: photoURL }}
              style={styles.avatar}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headerText}>{displayName}</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(SCREEN_PROFILE_EDIT)}>
            <View style={styles.imageContainer}>
              <Image
                source={iconSettings}
                style={styles.editIcon}
                resizeMode="contain"
              />
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
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  avatar: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
    alignSelf: 'flex-start',
  },
  editIcon: {
    flex: 1,
    height: 20,
    width: 20,
    alignSelf: 'flex-end',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndexScreen)