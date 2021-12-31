import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { BasicLitten } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type { Cache, LittenFeedObject, ObjectById } from 'store/types'

const initialState: Cache = {
  feed: [],
  littens: {},
  users: {},
}

const cacheSlice = createSlice<Cache>({
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
  },
})

export const { addLitten, addUser, setFeed, setLittens, setUsers } =
  cacheSlice.actions

export default cacheSlice.reducer
