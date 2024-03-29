import { APP_IS_DEV } from '@utils/env'
import { useCallback, useMemo } from 'react'
import { usePaddingBottom, useUserPosts, useTheme } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Alert, SectionList, View } from 'react-native'
import Services from '@services/services'
import { UIListItem, UIText } from '@ui-elements'
import { Routes, WebViews } from '@utils/constants'
import { getListItemLayout } from '@utils/functions'
import { reportTypes } from '@utils/litten'
import { translate } from '@utils/i18n'
import type { ProfileMainScreenNavigationProp } from '@utils/types/routes'

type MainList = ReadonlyArray<{
  key: string
  title: string
  data: any[]
}>

const ProfileMainScreen = () => {
  const [activePosts, pastPosts] = useUserPosts()
  const navigation = useNavigation<ProfileMainScreenNavigationProp>()
  const { showActionSheetWithOptions } = useActionSheet()
  const withPaddingBottom = usePaddingBottom()
  const {
    createStyles,
    commonStyles: {
      commonStyles: { contentContainerStyle },
    },
  } = useTheme()

  const styles = createStyles((theme) => ({
    sectionHeader: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
  }))

  const signout = useCallback(() => Services.auth.signOut(), [])

  const showActionSheetFeedback = useCallback(() => {
    const reportTypesLabels = reportTypes.map(({ label }) => label)
    const options = [...reportTypesLabels, translate('cta.cancel')]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: null,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        const type = reportTypes[buttonIndex]?.key

        if (type) {
          navigation.navigate(Routes.SCREEN_PROFILE_REPORT, {
            type,
          })
        }
      },
    )
  }, [navigation, showActionSheetWithOptions])

  const signoutConfirm = useCallback(() => {
    Alert.alert(
      translate('cta.signOut'),
      translate('feedback.confirmMessages.signOut'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => signout(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }, [signout])

  const mainOptions: MainList = useMemo(
    () => [
      {
        key: 'firstHeader',
        title: translate('screens.profile.firstHeader'),
        data: [
          {
            key: 'newPost',
            title: translate('screens.profile.newPost'),
            navigateTo: {
              path: Routes.SCREEN_TAB_NAV_NEW,
            },
          },
          {
            key: 'activePosts',
            title: translate('screens.profile.activePosts'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_POSTS,
              options: {
                active: true,
              },
            },
            otherProps: {
              badgeNum: activePosts.length,
              badgeActive: activePosts.length > 0,
              hasExtra: true,
            },
          },
          {
            key: 'pastPosts',
            title: translate('screens.profile.pastPosts'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_POSTS,
              options: {
                active: false,
              },
            },
            otherProps: {
              badgeNum: pastPosts.length,
              hasExtra: true,
            },
          },
        ],
      },
      {
        key: 'secondHeader',
        title: translate('screens.profile.secondHeader'),
        data: [
          {
            key: 'settings',
            title: translate('screens.profile.settings'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_SETTINGS,
            },
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'help',
            title: translate('screens.profile.help'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_WEBVIEW,
              options: {
                title: translate('screens.profile.help'),
                path: WebViews.WEB_APP_HELP_AND_CONTACT,
              },
            },
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'contactUs',
            title: translate('screens.profile.contactUs'),
            onPress: showActionSheetFeedback,
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'termsAndConditions',
            title: translate('screens.profile.termsAndConditions'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_WEBVIEW,
              options: {
                title: translate('screens.profile.termsAndConditions'),
                path: WebViews.WEB_APP_TERMS_AND_CONDITIONS,
              },
            },
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'privacyPolicy',
            title: translate('screens.profile.privacyPolicy'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_WEBVIEW,
              options: {
                title: translate('screens.profile.privacyPolicy'),
                path: WebViews.WEB_APP_PRIVACY_POLICY,
              },
            },
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'about',
            title: translate('screens.profile.about'),
            navigateTo: {
              path: Routes.SCREEN_PROFILE_ABOUT,
            },
            otherProps: {
              hasExtra: true,
            },
          },
          {
            key: 'hacks',
            title: translate('screens.dev.hacks'),
            navigateTo: {
              path: Routes.SCREEN_DEV_HACKS,
            },
            otherProps: {
              hasExtra: true,
            },
            devOnly: true,
          },
          {
            key: 'signOut',
            title: translate('cta.signOut'),
            onPress: signoutConfirm,
          },
        ],
      },
    ],
    [
      activePosts.length,
      pastPosts.length,
      showActionSheetFeedback,
      signoutConfirm,
    ],
  )

  const renderItem = useCallback(
    ({ item: { title, onPress, navigateTo, otherProps = {}, devOnly } }) => {
      if (devOnly && !APP_IS_DEV) {
        return null
      }

      const pressFn = navigateTo?.path
        ? () => navigation.navigate(navigateTo.path, navigateTo.options)
        : onPress
      return (
        <UIListItem onPress={pressFn} {...otherProps}>
          {title}
        </UIListItem>
      )
    },
    [navigation],
  )

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <View style={styles.sectionHeader}>
        <UIText>{title}</UIText>
      </View>
    ),
    [styles.sectionHeader],
  )

  const getItemLayout = useCallback(getListItemLayout, [])

  return (
    <SectionList
      sections={mainOptions}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
      getItemLayout={getItemLayout}
    />
  )
}

export default ProfileMainScreen
