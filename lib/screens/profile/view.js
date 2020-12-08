/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { useCallback, useEffect, useRef, useState } from 'react'
import Search from 'model/search'
import LittenCard from 'components/litten-card'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { FlatList, StyleSheet, View } from 'react-native'
import { UIBalloon, UISeparator } from 'ui-elements'
import UserProfileDetailsScreen from 'screens/profile/view-details'
import { getFavouriteIndex } from 'utils/functions'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser, SearchSettings } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
  +searchSettings: SearchSettings,
|}
type AutheUserActions = typeof AuthenticatedUserActions
type DispatchProps = {|
  ...AutheUserActions,
|}
type ViewProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
  searchSettings: state.searchSettings,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const UserProfileScreen: (args: any) => React$Node = ({
  addFavourite,
  authenticatedUser,
  removeFavourite,
  route,
}) => {
  const [littens, setLittens] = useState([])

  const { user } = route.params
  const {
    extra: { id: userUid },
    saved: { activePosts, favourites } = {},
  } = authenticatedUser
  const search = useRef(new Search({ user })).current

  const getUserActivePosts = useCallback(async () => {
    const userPosts = await search.userActivePosts()
    setLittens(userPosts)
  }, [search])

  useEffect(() => {
    if (user.id === userUid) {
      setLittens(activePosts)
    } else {
      getUserActivePosts()
    }
  }, [activePosts, getUserActivePosts, user.id, userUid])

  const handleOnPressAction = (item) => {
    const favouriteIndex = getFavouriteIndex(item, favourites)
    if (favouriteIndex < 0) {
      addFavourite(item)
    } else {
      removeFavourite(favouriteIndex)
    }
  }

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.profile.view')}
        </ScreenSimpleHeaderTemplate>
      }>
      <View style={styles.resultsContainer}>
        <FlatList
          data={littens}
          renderItem={({ item }) => (
            <LittenCard
              litten={item}
              authenticatedUser={authenticatedUser}
              handleOnPressAction={() => handleOnPressAction(item)}
            />
          )}
          ListHeaderComponent={<UserProfileDetailsScreen user={user} />}
          ListFooterComponent={<UISeparator invisible />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <UIBalloon type="info">
                {translate('screens.profile.viewEmptyUserPosts')}
              </UIBalloon>
            </View>
          }
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
})

export default connect<
  ViewProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileScreen)
