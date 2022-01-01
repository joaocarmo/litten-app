import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FormLoginActions from '@store/actions/form-login'
import RecoverForm from '@forms/recover/form-recover'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(FormLoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecoverForm)
