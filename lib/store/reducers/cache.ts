/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { LittenFeedObject, ObjectById } from '@store/types'

const initialState = {
  feed: [],
  littens: {},
  users: {},
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addLitten(state, action: PayloadAction<BasicLitten>) {
      state.littens[action.payload.id] = action.payload
    },

    addUser(state, action: PayloadAction<BasicUser>) {
      state.users[action.payload.id] = action.payload
    },

    setFeed(state, action: PayloadAction<LittenFeedObject[]>) {
      state.feed = action.payload
    },

    setLittens(state, action: PayloadAction<ObjectById<BasicLitten>>) {
      state.littens = action.payload
    },

    setUsers(state, action: PayloadAction<ObjectById<BasicUser>>) {
      state.users = action.payload
    },

    reset() {
      return { ...initialState }
    },
  },
})

export const { addLitten, addUser, setFeed, setLittens, setUsers, reset } =
  cacheSlice.actions

export default cacheSlice.reducer
