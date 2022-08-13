/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { LittenFeedObject } from '@store/types'

const initialState = {
  feed: [],
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setFeed(state, action: PayloadAction<LittenFeedObject[]>) {
      state.feed = action.payload
    },

    reset() {
      return { ...initialState }
    },
  },
})

export const { setFeed, reset } = cacheSlice.actions

export default cacheSlice.reducer
