/**
 * @format
 * @flow
 */

import { createSlice } from '@reduxjs/toolkit'
import type { PhotoObject, ReportForm } from 'store/types'

type PayloadAction<P = void, T = string> = {|
  payload: P,
  type: T,
|}

export const initialState: ReportForm = {
  attachments: [],
  content: '',
  type: '',
}

const formReportSlice: any = createSlice<ReportForm>({
  name: 'formReport',
  initialState,
  reducers: {
    resetForm(state, action: PayloadAction<string>) {
      state.attachments = initialState.attachments
      state.content = initialState.content
      state.type = initialState.type
    },
    setAttachments(state, action: PayloadAction<PhotoObject[]>) {
      state.attachments = action.payload
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload
    },
  },
})

export const { resetForm, setAttachments, setContent, setType } =
  formReportSlice.actions

export default formReportSlice.reducer
