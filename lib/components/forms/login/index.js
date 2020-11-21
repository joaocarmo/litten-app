/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormLoginActions } from 'store/actions/form-login'
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
|}
type LoginFormProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(FormLoginActions, dispatch)

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
