/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormLoginActions } from 'store/actions/form-login'
import { setExtra } from 'store/actions/authenticated-user'
import LoginForm from './form-login'
import type { Dispatch, State } from 'store/types/state'
import type { LoginForm as LoginFormType } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +formLogin: LoginFormType,
|}
type LoginActions = typeof FormLoginActions
type DispatchProps = {|
  ...LoginActions,
  +setExtra: typeof setExtra,
|}
type LoginFormProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const actionCreators = {
  ...FormLoginActions,
  setExtra,
}

const mapStateToProps = (state: State): StateProps => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(actionCreators, dispatch)

export default connect<
  LoginFormProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)
