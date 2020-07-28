/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoginActions from 'store/actions/form-login'
import LoginForm from './form-login'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
