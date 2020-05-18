/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NewActions from 'store/actions/form-new'
import NewLocationForm from './form-new-location'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
  formNew: state.formNew,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(NewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewLocationForm)
