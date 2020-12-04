/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import ScreenTemplate from 'templates/screen'
import HomeSearchScreen from './search'
import HomeIndexHeader from './home-header'
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
type SearchProps = {|
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

const HomeIndexScreen: (args: any) => React$Node = (props) => (
  <ScreenTemplate header={<HomeIndexHeader {...props} />}>
    <HomeSearchScreen {...props} />
  </ScreenTemplate>
)

export default connect<
  SearchProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeIndexScreen)
