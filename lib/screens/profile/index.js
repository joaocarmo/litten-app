/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { useUserInfo } from 'hooks'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { UIAvatar } from 'ui-elements'
import ScreenTemplate from 'templates/screen'
import ProfileMainScreen from 'screens/profile/main'
import { placeholderUser } from 'images'
import { Cog as CogIcon } from 'images/components/icons'
import { shortenName } from 'utils/functions'
import {
  PLACEHOLDER_USER_DISPLAY_NAME,
  SCREEN_PROFILE_EDIT,
  SCREEN_USER_PROFILE,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH,
  UI_ICON_SIZE_MINI,
} from 'utils/constants'
import colors from 'styles/colors'
import { fontSize, fontWeight } from 'styles/typography'

const ProfileIndexScreen: (args: any) => React$Node = () => {
  const [user] = useUserInfo()

  const { displayName, photoURL = null } = user

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
            {shortenName(displayName) || PLACEHOLDER_USER_DISPLAY_NAME}
          </Text>
          <Pressable
            onPress={() => navigation.navigate(SCREEN_PROFILE_EDIT)}
            style={styles.imageContainer}>
            <CogIcon
              width={UI_ICON_SIZE_MINI}
              height={UI_ICON_SIZE_MINI}
              fill={colors.white}
              style={styles.editIcon}
            />
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
    fontSize: fontSize.xxlarge,
    fontWeight: fontWeight.bold,
    color: colors.white,
  },
  imageContainer: {
    flex: 1,
  },
  editIcon: {
    flex: 1,
    alignSelf: 'flex-end',
  },
})

export default ProfileIndexScreen
