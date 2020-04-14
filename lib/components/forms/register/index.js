/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as RegisterActions from 'store/actions/form-register'
import RegisterForm from './form-register'

const mapStateToProps = (state) => ({
  formRegister: state.formRegister,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(RegisterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
