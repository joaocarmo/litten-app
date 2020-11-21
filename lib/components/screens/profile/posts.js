/**
 * @format
 * @flow
 */

import { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import Litten from 'model/litten'
import Search from 'model/search'
import LittenCard from 'components/litten-card'
import Empty from 'components/empty'
import { placeholderEmptyUserPosts } from 'images'
import { UILoader } from 'ui-elements'
import { translate } from 'utils/i18n'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type AutheUserActions = typeof AuthenticatedUserActions
type DispatchProps = {|
  ...AutheUserActions,
|}
type PostsProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const ProfilePosts: (args: any) => React$Node = ({
  active,
  authenticatedUser,
  setActivePosts,
  setPastPosts,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { showActionSheetWithOptions } = useActionSheet()

  const {
    extra: user,
    saved: { activePosts, pastPosts },
  } = authenticatedUser

  const posts = active ? activePosts : pastPosts

  const search = useRef(new Search({ user })).current

  const updatePosts = async () => {
    const userActivePosts = await search.userActivePosts()
    setActivePosts(userActivePosts)
    const userInactivePosts = await search.userInactivePosts()
    setPastPosts(userInactivePosts)
  }

  const toggleActive = async (item) => {
    setIsLoading(true)
    const litten = new Litten(item)
    if (active) {
      await litten.archive()
    } else {
      await litten.activate()
    }
    await updatePosts()
    setIsLoading(false)
  }

  const deleteLitten = async (item) => {
    setIsLoading(true)
    const litten = new Litten(item)
    await litten.delete()
    await updatePosts()
    setIsLoading(false)
  }

  const confirmDelete = (item) => {
    const { title } = item
    Alert.alert(
      translate('cta.deleteLitten'),
      translate('feedback.confirmMessages.deleteLitten', { title }),
      [
        {
          text: translate('cta.yes'),
          onPress: () => deleteLitten(item),
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

  const handleOnPressAction = (item) => {
    const markAs = active
      ? translate('screens.profile.postsMarkInactive')
      : translate('screens.profile.postsMarkActive')

    showActionSheetWithOptions(
      {
        options: [
          translate('cta.cancel'),
          markAs,
          translate('screens.profile.postsDelete'),
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          toggleActive(item)
        } else if (buttonIndex === 2) {
          confirmDelete(item)
        }
      },
    )
  }

  return (
    <View style={styles.postsContainer}>
      <UILoader active={isLoading} transparent />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <LittenCard
            litten={item}
            authenticatedUser={authenticatedUser}
            handleOnPressAction={() => handleOnPressAction(item)}
            editable
          />
        )}
        ListEmptyComponent={
          <Empty
            imageSource={placeholderEmptyUserPosts}
            header={translate('screens.profile.postsEmptyTitle', {
              activeOrArchived: active
                ? translate('screens.profile.postsEmptyTitleActive')
                : translate('screens.profile.postsEmptyTitleArchived'),
            })}>
            {translate('screens.profile.postsEmptyText', {
              createOrArchive: active
                ? translate('screens.profile.postsEmptyTextCreate')
                : translate('screens.profile.postsEmptyTextArchive'),
            })}
          </Empty>
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default connect<
  PostsProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePosts)
