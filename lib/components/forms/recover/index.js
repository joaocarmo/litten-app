/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoginActions from 'store/actions/form-login'
import RecoverForm from './form-recover'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(LoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecoverForm)
