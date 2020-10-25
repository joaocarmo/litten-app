/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, SectionList, StyleSheet, View } from 'react-native'
import Auth from 'model/auth'
import Search from 'model/search'
import { UIActionSheet, UIListItem, UISeparator, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  SCREEN_DEV_STORYBOOK,
  SCREEN_PROFILE_ABOUT,
  SCREEN_PROFILE_POSTS,
  SCREEN_PROFILE_REPORT,
  SCREEN_PROFILE_SETTINGS,
  SCREEN_PROFILE_WEBVIEW,
  SCREEN_TAB_NAV_NEW,
  STRUCTURE_TAB_NAV_HEIGHT,
  WEB_APP_HELP_AND_CONTACT,
  WEB_APP_PRIVACY_POLICY,
  WEB_APP_TERMS_AND_CONDITIONS,
} from 'utils/constants'
import colors from 'styles/colors'

const mapStateToProps = (state) => ({
  saved: state.authenticatedUser.saved,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileMainScreen: (args: any) => React$Node = ({
  saved: { activePosts, pastPosts },
  setActivePosts,
  setPastPosts,
}) => {
  const search = useRef(new Search()).current

  const navigation = useNavigation()

  const updatePosts = async () => {
    if (!activePosts.length) {
      const userActivePosts = await search.userActivePosts()
      setActivePosts(userActivePosts)
    }
    if (!pastPosts.length) {
      const userInactivePosts = await search.userInactivePosts()
      setPastPosts(userInactivePosts)
    }
  }

  useEffect(() => {
    updatePosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signout = async () => await Auth.signOut()

  const showActionSheetFeedback = () => {
    UIActionSheet(
      {
        options: [
          translate('cta.cancel'),
          translate('screens.profile.contactUsAbuse'),
          translate('screens.profile.contactUsBroken'),
          translate('screens.profile.contactUsFeedback'),
        ],
        destructiveButtonIndex: null,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          navigation.navigate(SCREEN_PROFILE_REPORT, { type: 'abuse' })
        } else if (buttonIndex === 2) {
          navigation.navigate(SCREEN_PROFILE_REPORT, { type: 'broken' })
        } else if (buttonIndex === 3) {
          navigation.navigate(SCREEN_PROFILE_REPORT, { type: 'feedback' })
        }
      },
    )
  }

  const signoutConfirm = () => {
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
        { cancelable: false },
      ],
    )
  }

  const mainOptions = [
    {
      key: 'firstHeader',
      title: translate('screens.profile.firstHeader'),
      data: [
        {
          key: 'newPost',
          title: translate('screens.profile.newPost'),
          navigateTo: {
            path: SCREEN_TAB_NAV_NEW,
          },
        },
        {
          key: 'activePosts',
          title: translate('screens.profile.activePosts'),
          navigateTo: {
            path: SCREEN_PROFILE_POSTS,
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
            path: SCREEN_PROFILE_POSTS,
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
            path: SCREEN_PROFILE_SETTINGS,
          },
          otherProps: {
            hasExtra: true,
          },
        },
        {
          key: 'help',
          title: translate('screens.profile.help'),
          navigateTo: {
            path: SCREEN_PROFILE_WEBVIEW,
            options: {
              title: translate('screens.profile.help'),
              path: WEB_APP_HELP_AND_CONTACT,
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
            path: SCREEN_PROFILE_WEBVIEW,
            options: {
              title: translate('screens.profile.termsAndConditions'),
              path: WEB_APP_TERMS_AND_CONDITIONS,
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
            path: SCREEN_PROFILE_WEBVIEW,
            options: {
              title: translate('screens.profile.privacyPolicy'),
              path: WEB_APP_PRIVACY_POLICY,
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
            path: SCREEN_PROFILE_ABOUT,
          },
          otherProps: {
            hasExtra: true,
          },
        },
        {
          key: 'storybook',
          title: translate('screens.dev.storybook'),
          navigateTo: {
            path: SCREEN_DEV_STORYBOOK,
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
  ]

  const renderItem = ({
    item: { title, onPress, navigateTo, otherProps = {}, devOnly },
  }) => {
    if (devOnly && process.env.NODE_ENV !== 'development') {
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
  }

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <UIText>{title}</UIText>
    </View>
  )

  return (
    <SectionList
      sections={mainOptions}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={<UISeparator invisible />}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMainScreen)
