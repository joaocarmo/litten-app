import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FormLoginActions from '@store/actions/form-login'
import LoginForm from '@forms/login/form-login'

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(FormLoginActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
