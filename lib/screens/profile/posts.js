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
import LittenSmartCard from 'components/litten-card/smart'
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
  authenticatedUser: {
    extra: user,
    saved: { activePosts, pastPosts },
  },
  setActivePosts,
  setPastPosts,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const { showActionSheetWithOptions } = useActionSheet()

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
      ],
    )
  }

  const handleOnPressAction = (item) => {
    const options = [
      active
        ? translate('screens.profile.postsMarkInactive')
        : translate('screens.profile.postsMarkActive'),
      translate('screens.profile.postsDelete'),
      translate('cta.cancel'),
    ]
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          toggleActive(item)
        } else if (buttonIndex === 1) {
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
          <LittenSmartCard
            litten={item}
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
