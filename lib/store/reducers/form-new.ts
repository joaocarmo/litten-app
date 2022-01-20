/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { DBLocationObject } from '@db/schemas/location'
import { locationSchema } from '@db/schemas/location'
import type { PhotoObject } from '@store/types'

type PhotoPayload = {
  photo?: PhotoObject
  photoIndex?: number
}

const initialState = {
  location: locationSchema,
  photos: [],
  species: '',
  story: '',
  title: '',
  type: '',
  tags: [],
  useExtraInfo: false,
}

const formNewSlice = createSlice({
  name: 'formNew',
  initialState,
  reducers: {
    addPhoto(state, action: PayloadAction<PhotoPayload>) {
      state.photos.push(action.payload.photo)
    },

    clearNewForm(state) {
      state.location = initialState.location
      state.photos = initialState.photos
      state.species = initialState.species
      state.story = initialState.story
      state.title = initialState.title
      state.type = initialState.type
      state.tags = initialState.tags
      state.useExtraInfo = initialState.useExtraInfo
    },

    removePhoto(state, action: PayloadAction<PhotoPayload>) {
      state.photos.splice(action.payload.photoIndex, 1)
    },

    setLocation(state, action: PayloadAction<DBLocationObject>) {
      state.location = { ...locationSchema, ...action.payload }
    },

    setSpecies(state, action: PayloadAction<string>) {
      state.species = action.payload
    },

    setStory(state, action: PayloadAction<string>) {
      state.story = action.payload
    },

    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },

    setType(state, action: PayloadAction<string>) {
      state.type = action.payload
    },

    setUseExtraInfo(state, action: PayloadAction<boolean>) {
      state.useExtraInfo = action.payload
    },

    updatePhoto(state, action: PayloadAction<PhotoPayload>) {
      state.photos.splice(action.payload.photoIndex, 1, action.payload.photo)
    },
  },
})

export const {
  addPhoto,
  clearNewForm,
  removePhoto,
  setLocation,
  setSpecies,
  setStory,
  setTags,
  setTitle,
  setType,
  setUseExtraInfo,
  updatePhoto,
} = formNewSlice.actions

export default formNewSlice.reducer
