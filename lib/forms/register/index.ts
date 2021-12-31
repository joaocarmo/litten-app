import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FormRegisterActions from 'store/actions/form-register'
import { setAutoRedirectIfLoggedIn } from 'store/actions/app-settings'
import RegisterForm from 'forms/register/form-register'
import type { Dispatch, State } from 'store/types/state'
import type { RegisterForm as RegisterFormType } from 'store/types'

type OwnProps = any
type StateProps = {
  formRegister: RegisterFormType
}
type RegisterActions = typeof FormRegisterActions
type DispatchProps = RegisterActions & {
  setAutoRedirectIfLoggedIn: typeof setAutoRedirectIfLoggedIn
}
type RegisterFormProps = OwnProps & StateProps & DispatchProps

const actionCreators = {
  ...FormRegisterActions,
  setAutoRedirectIfLoggedIn,
}

const mapStateToProps = (state: State): StateProps => ({
  formRegister: state.formRegister,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(actionCreators, dispatch)

export default connect<
  RegisterFormProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch
>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm)
