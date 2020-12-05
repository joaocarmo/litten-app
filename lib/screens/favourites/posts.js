/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { FlatList, StyleSheet, View } from 'react-native'
import LittenCard from 'components/litten-card'
import Empty from 'components/empty'
import { placeholderEmptyFavouritePosts } from 'images'
import { getFavouriteIndex } from 'utils/functions'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type AuthUserActions = typeof AuthenticatedUserActions
type DispatchProps = {|
  ...AuthUserActions,
|}
type FavouritePostsProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(AuthenticatedUserActions, dispatch)

const FavouritePostsScreen: (args: any) => React$Node = ({
  authenticatedUser,
  removeFavourite,
}) => {
  const {
    saved: { favourites },
  } = authenticatedUser

  const handleOnPressAction = (item) =>
    removeFavourite(getFavouriteIndex(item, favourites))

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={favourites}
        renderItem={({ item }) => (
          <LittenCard
            litten={item}
            authenticatedUser={authenticatedUser}
            handleOnPressAction={() => handleOnPressAction(item)}
          />
        )}
        ListEmptyComponent={
          <Empty
            imageSource={placeholderEmptyFavouritePosts}
            header={translate('screens.favourites.emptyPostsTitle')}>
            {translate('screens.favourites.emptyPostsText')}
          </Empty>
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
    paddingTop: 20,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
})

export default connect<
  FavouritePostsProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(FavouritePostsScreen)
