/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as RegisterActions from 'store/actions/form-login'
import LoginForm from './form-login'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(RegisterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
