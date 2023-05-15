import { useNavigation } from '@react-navigation/native'
import { useUserInfo, useTheme } from '@hooks'
import { Pressable, Text, View } from 'react-native'
import { UIAvatar } from '@ui-elements'
import ScreenTemplate from '@templates/screen'
import ProfileMainScreen from '@screens/profile/main'
import { Cog as CogIcon } from '@images/components/icons'
import { shortenName } from '@utils/functions'
import {
  PLACEHOLDER_USER_DISPLAY_NAME,
  Routes,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import type { ProfileIndexScreenNavigationProp } from '@utils/types/routes'

const ProfileIndexScreen = () => {
  const [user] = useUserInfo()
  const { displayName, photoURL = null } = user
  const navigation = useNavigation<ProfileIndexScreenNavigationProp>()
  const {
    createStyles,
    theme: { colors },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    header: {
      width: STRUCTURE_TEMPLATE_SCREEN_HEADER_PROFILE_WIDTH,
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      flex: 2,
      textAlign: 'center',
      fontSize: typography.fontSize.xxlarge,
      fontWeight: typography.fontWeight.bold,
      color: theme.colors.textAlt,
    },
    imageContainer: {
      flex: 1,
    },
    editIcon: {
      flex: 1,
      alignSelf: 'flex-end',
    },
  }))

  return (
    <ScreenTemplate
      header={
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.navigate(Routes.SCREEN_PROFILE_VIEW, {
                user,
              })
            }
            style={styles.imageContainer}
          >
            <UIAvatar source={photoURL} />
          </Pressable>
          <Text
            style={styles.headerText}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {shortenName(displayName) || PLACEHOLDER_USER_DISPLAY_NAME}
          </Text>
          <Pressable
            onPress={() => navigation.navigate(Routes.SCREEN_PROFILE_EDIT)}
            style={styles.imageContainer}
          >
            <CogIcon
              width={UI_ICON_SIZE_MINI}
              height={UI_ICON_SIZE_MINI}
              fill={colors.textAlt}
              style={styles.editIcon}
            />
          </Pressable>
        </View>
      }
    >
      <ProfileMainScreen />
    </ScreenTemplate>
  )
}

export default ProfileIndexScreen
