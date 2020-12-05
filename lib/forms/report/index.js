/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormReportActions } from 'store/actions/form-report'
import ReportForm from 'forms/report/form-report'
import type { Dispatch, State } from 'store/types/state'
import type { ReportForm as ReportFormType } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +formReport: ReportFormType,
|}
type RegisterActions = typeof FormReportActions
type DispatchProps = {|
  ...RegisterActions,
|}
type RegisterFormProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  formReport: state.formReport,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(FormReportActions, dispatch)

export default connect<
  RegisterFormProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(ReportForm)
