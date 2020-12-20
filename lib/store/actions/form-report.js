/**
 * @format
 * @flow
 */

import type { GenericActionCreator, PhotoObject } from 'store/types'

export const FORM_REPORT_SET_ATTACHMENTS = 'FORM_REPORT_SET_ATTACHMENTS'
export const FORM_REPORT_SET_CONTENT = 'FORM_REPORT_SET_CONTENT'
export const FORM_REPORT_SET_TYPE = 'FORM_REPORT_SET_TYPE'

export function setAttachments(
  payload: PhotoObject[],
): GenericActionCreator<PhotoObject[]> {
  return {
    type: FORM_REPORT_SET_ATTACHMENTS,
    payload,
  }
}

export function setContent(payload: string): GenericActionCreator<string> {
  return {
    type: FORM_REPORT_SET_CONTENT,
    payload,
  }
}

export function setType(payload: string): GenericActionCreator<string> {
  return {
    type: FORM_REPORT_SET_TYPE,
    payload,
  }
}

export const FormReportActions = {
  setAttachments,
  setContent,
  setType,
}
