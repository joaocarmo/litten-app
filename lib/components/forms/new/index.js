/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import * as NewActions from 'store/actions/form-new'
import NewForm from './form-new'

const mapStateToProps = (state) => ({
  formNew: state.formNew,
  basicUser: {
    displayName: state.authenticatedUser.basic.displayName,
    photoURL: state.authenticatedUser.basic.photoURL,
  },
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...AuthenticatedUser, ...NewActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)
