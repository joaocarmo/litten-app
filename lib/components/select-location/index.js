/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormNewActions } from 'store/actions/form-new'
import SelectLocation from './select-location'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
  formNew: state.formNew,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(FormNewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SelectLocation)
