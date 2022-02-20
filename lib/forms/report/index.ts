import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FormReportActions from '@store/actions/form-report'
import ReportForm from '@forms/report/form-report'

const mapStateToProps = (state) => ({
  formReport: state.formReport,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(FormReportActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm)
