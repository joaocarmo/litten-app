/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { PhotoObject } from '@store/types'

const initialState = {
  attachments: [],
  content: '',
  type: '',
}
const formReportSlice = createSlice({
  name: 'formReport',
  initialState,
  reducers: {
    resetForm(state) {
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

    reset() {
      return { ...initialState }
    },
  },
})

export const { resetForm, setAttachments, setContent, setType, reset } =
  formReportSlice.actions

export default formReportSlice.reducer
