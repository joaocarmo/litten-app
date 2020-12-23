/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { setFilters as setFiltersAction } from 'store/actions/search-settings'
import { FlatList, StyleSheet, View } from 'react-native'
import Empty from 'components/empty'
import { UIListItem } from 'ui-elements'
import { Cross as CrossIcon } from 'images/components/icons'
import { placeholderEmptyFavouriteSearches } from 'images'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { AuthenticatedUser } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
|}
type AuthUserActions = typeof AuthenticatedUserActions
type SetFiltersActionType = typeof setFiltersAction
type DispatchProps = {|
  ...AuthUserActions,
  +setFilters: SetFiltersActionType,
|}
type FavouriteFiltersProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    { ...AuthenticatedUserActions, setFilters: setFiltersAction },
    dispatch,
  )

const FavouriteFiltersScreen: (props: FavouriteFiltersProps) => React$Node = ({
  authenticatedUser: {
    saved: { filters },
  },
  removeFavouriteFilter,
  setFilters,
}) => {
  const renderItem = ({ item: { key: name, ...filter }, index }) => (
    <UIListItem
      IconComponent={CrossIcon}
      iconPosition="right"
      onPressIcon={() => removeFavouriteFilter(index)}
      onPress={() => setFilters(filter)}>
      {name}
    </UIListItem>
  )

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={filters}
        renderItem={renderItem}
        ListEmptyComponent={
          <Empty
            imageSource={placeholderEmptyFavouriteSearches}
            header={translate('screens.favourites.emptyFiltersTitle')}>
            {translate('screens.favourites.emptyFiltersText')}
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
  FavouriteFiltersProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(FavouriteFiltersScreen)
