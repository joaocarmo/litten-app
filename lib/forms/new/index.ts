import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUserActions from '@store/actions/authenticated-user'
import * as FormNewActions from '@store/actions/form-new'
import NewForm from '@forms/new/form-new'

const mapStateToProps = (state) => ({
  formNew: state.formNew,
  user: state.authenticatedUser.extra,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthenticatedUserActions, ...FormNewActions },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)
