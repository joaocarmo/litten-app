/**
 * @format
 * @flow strict-local
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as NewActions from 'store/actions/form-new'
import NewForm from './form-new'

const mapStateToProps = (state) => ({
  formNew: state.formNew,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(NewActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)
