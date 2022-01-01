import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUserActions from '@store/actions/authenticated-user'
import * as FormProfileActions from '@store/actions/form-profile'
import FormProfile from '@forms/profile/form-profile'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
  formProfile: state.formProfile,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthenticatedUserActions, ...FormProfileActions },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(FormProfile)
