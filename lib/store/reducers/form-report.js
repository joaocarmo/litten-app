/**
 * @format
 * @flow
 */

import produce from 'utils/immer'
import type { ReportForm } from 'store/types'
import {
  FORM_REPORT_SET_ATTACHMENTS,
  FORM_REPORT_SET_CONTENT,
  FORM_REPORT_SET_TYPE,
} from 'store/actions/form-report'

export const initialState: ReportForm = {
  attachments: [],
  content: '',
  type: '',
}

const formReport: (
  currentState: ReportForm | void,
  a: void,
  b: void,
  c: void,
  ...extraArgs: Array<any>
) => ReportForm = produce<ReportForm>((draft: ReportForm, action: any) => {
  switch (action.type) {
    case FORM_REPORT_SET_ATTACHMENTS:
      draft.attachments = action.payload
      break
    case FORM_REPORT_SET_CONTENT:
      draft.content = action.payload
      break
    case FORM_REPORT_SET_TYPE:
      draft.type = action.payload
      break
    default:
      return draft
  }
}, initialState)

export default formReport
