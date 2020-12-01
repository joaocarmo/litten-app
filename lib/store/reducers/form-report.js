/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { ReportForm } from 'store/types'
import {
  FORM_REPORT_ADD_ATTACHMENT,
  FORM_REPORT_REMOVE_ATTACHMENT,
  FORM_REPORT_SET_CONTENT,
  FORM_REPORT_SET_TYPE,
} from 'store/actions/form-report'

export const initialState: ReportForm = {
  attachments: [],
  content: '',
  type: '',
}

const formReport = produce<ReportForm>((draft: ReportForm, action: any) => {
  switch (action.type) {
    case FORM_REPORT_ADD_ATTACHMENT:
      draft.attachments = [action.payload]
      break
    case FORM_REPORT_REMOVE_ATTACHMENT:
      draft.attachments = []
      break
    case FORM_REPORT_SET_CONTENT:
      draft.content = action.payload
      break
    case FORM_REPORT_SET_TYPE:
      draft.type = action.payload
      break
    default:
      return initialState
  }
}, initialState)

export default formReport
