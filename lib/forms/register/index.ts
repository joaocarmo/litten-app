import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FormRegisterActions from '@store/actions/form-register'
import { setAutoRedirectIfLoggedIn } from '@store/actions/app-settings'
import RegisterForm from '@forms/register/form-register'

const actionCreators = {
  ...FormRegisterActions,
  setAutoRedirectIfLoggedIn,
}

const mapStateToProps = (state) => ({
  formRegister: state.formRegister,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
