/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormRegisterActions } from 'store/actions/form-register'
import { toggleAutoRedirectIfLoggedIn } from 'store/actions/app-settings'
import { setExtra } from 'store/actions/authenticated-user'
import RegisterForm from './form-register'

const actionCreators = {
  ...FormRegisterActions,
  setExtra,
  toggleAutoRedirectIfLoggedIn,
}

const mapStateToProps = (state) => ({
  formRegister: state.formRegister,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
