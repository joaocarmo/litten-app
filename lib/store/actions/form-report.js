/**
 * @format
 * @flow
 */

import type { GenericActionCreator, PhotoObject } from 'store/types'

export const FORM_REPORT_ADD_ATTACHMENT = 'FORM_REPORT_ADD_ATTACHMENT'
export const FORM_REPORT_REMOVE_ATTACHMENT = 'FORM_REPORT_ADD_ATTACHMENT'
export const FORM_REPORT_SET_CONTENT = 'FORM_REPORT_SET_CONTENT'
export const FORM_REPORT_SET_TYPE = 'FORM_REPORT_SET_TYPE'

export function addAttachment(
  payload: PhotoObject,
): GenericActionCreator<PhotoObject> {
  return {
    type: FORM_REPORT_ADD_ATTACHMENT,
    payload,
  }
}

export function removeAttachment(payload: null): GenericActionCreator<null> {
  return {
    type: FORM_REPORT_REMOVE_ATTACHMENT,
    payload: null,
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
  addAttachment,
  removeAttachment,
  setContent,
  setType,
}
