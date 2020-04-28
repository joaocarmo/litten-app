/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as RegisterActions from 'store/actions/form-register'
import { toggleAutoRedirectIfLoggedIn } from 'store/actions/app-settings'
import RegisterForm from './form-register'

const actionCreators = { ...RegisterActions, toggleAutoRedirectIfLoggedIn }

const mapStateToProps = (state) => ({
  formRegister: state.formRegister,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
