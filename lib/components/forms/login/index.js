/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoginActions from 'store/actions/form-login'
import { setExtra } from 'store/actions/authenticated-user'
import LoginForm from './form-login'

const actionCreators = {
  ...LoginActions,
  setExtra,
}

const mapStateToProps = (state) => ({
  formLogin: state.formLogin,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
