/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { FormProfileActions } from 'store/actions/form-profile'
import FormProfile from 'forms/profile/form-profile'
import type { Dispatch, State } from 'store/types/state'
import type {
  AuthenticatedUser,
  ProfileForm as ProfileFormType,
} from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +authenticatedUser: AuthenticatedUser,
  +formProfile: ProfileFormType,
|}
type AutheUserActions = typeof AuthenticatedUserActions
type ProfileActions = typeof FormProfileActions
type DispatchProps = {|
  ...AutheUserActions,
  ...ProfileActions,
|}
type EditProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  authenticatedUser: state.authenticatedUser,
  formProfile: state.formProfile,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    { ...AuthenticatedUserActions, ...FormProfileActions },
    dispatch,
  )

const ProfileForm: (args: any) => Node = (props) => <FormProfile {...props} />

export default (connect<
  EditProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileForm): any)
