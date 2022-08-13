/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BasicLitten } from '@model/types/litten'
import type { LittenFeedObject, ObjectById } from '@store/types'

const initialState = {
  feed: [],
  littens: {},
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addLitten(state, action: PayloadAction<BasicLitten>) {
      state.littens[action.payload.id] = action.payload
    },

    setFeed(state, action: PayloadAction<LittenFeedObject[]>) {
      state.feed = action.payload
    },

    setLittens(state, action: PayloadAction<ObjectById<BasicLitten>>) {
      state.littens = action.payload
    },

    reset() {
      return { ...initialState }
    },
  },
})

export const { addLitten, setFeed, setLittens, reset } = cacheSlice.actions

export default cacheSlice.reducer
