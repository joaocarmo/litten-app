/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthenticatedUserActions } from 'store/actions/authenticated-user'
import { FormNewActions } from 'store/actions/form-new'
import NewForm from './form-new'

const mapStateToProps = (state) => ({
  formNew: state.formNew,
  newLocation: state.appSettings.newLocation,
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthenticatedUserActions, ...FormNewActions },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)
