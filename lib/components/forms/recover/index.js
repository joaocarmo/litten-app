/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormLoginAction } from 'store/actions/form-login'
import RecoverForm from './form-recover'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(FormLoginAction, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecoverForm)
