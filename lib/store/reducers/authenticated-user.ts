/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { usesMetricSystem } from 'react-native-localize'
import { locationSchema } from '@db/schemas/location'
import { userSchema } from '@db/schemas/user'
import { getFavouriteIndex } from '@utils/functions'
import type {
  AuthenticatedUser,
  BasicAuthUser,
  SearchFilters,
} from '@store/types'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { DBCoordinateObject, DBLocationObject } from '@db/schemas/location'

const initialState: AuthenticatedUser = {
  basic: null,
  extra: userSchema,
  preferences: {
    useMetricUnits: usesMetricSystem() ?? true,
    shareMetrics: true,
  },
  saved: {
    activePosts: [],
    favourites: [],
    filters: [],
    pastPosts: [],
    searches: [],
  },
}

const authenticatedUserSlice = createSlice<AuthenticatedUser>({
  name: 'authenticatedUser',
  initialState,
  reducers: {
    addFavouriteFilter(state, action: PayloadAction<SearchFilters>) {
      state.saved.filters.push(action.payload)
    },

    addFavouriteLitten(state, action: PayloadAction<BasicLitten>) {
      state.saved.favourites.push(action.payload)
    },

    addSavedSearch(state, action: PayloadAction<string>) {
      state.saved.searches.unshift(action.payload)
      const newSearches = [...new Set(state.saved.searches)]
      state.saved.searches = newSearches
    },

    clearBasic(state) {
      state.basic = null
    },

    clearExtra(state) {
      state.extra = userSchema
    },

    clearSavedSearch(state) {
      state.saved.searches = []
    },

    removeFavouriteFilter(state, action: PayloadAction<string>) {
      const filterIndex = state.saved.filters.findIndex(
        ({ key }) => key === action.payload,
      )
      state.saved.filters.splice(filterIndex, 1)
    },

    removeFavouriteWithIndex(state, action: PayloadAction<number>) {
      state.saved.favourites.splice(action.payload, 1)
    },

    removeFavouriteLitten(state, action: PayloadAction<BasicLitten>) {
      const favouriteIndex = getFavouriteIndex(
        action.payload,
        state.saved.favourites,
      )
      state.saved.favourites.splice(favouriteIndex, 1)
    },

    removeSavedSearch(state, action: PayloadAction<string>) {
      const searchIndex = state.saved.searches.findIndex(
        (value) => value === action.payload,
      )
      state.saved.searches.splice(searchIndex, 1)
    },

    setActivePosts(state, action: PayloadAction<BasicLitten[]>) {
      state.saved.activePosts = action.payload
    },

    setBasic(state, action: PayloadAction<BasicAuthUser>) {
      state.basic = action.payload
    },

    setContactPreferences(state, action: PayloadAction<string>) {
      let newContactPreferences = [...(state.extra.contactPreferences || [])]

      if (newContactPreferences.includes(action.payload)) {
        newContactPreferences = newContactPreferences.filter(
          (value) => value !== action.payload,
        )
      } else {
        newContactPreferences.push(action.payload)
      }

      state.extra.contactPreferences = newContactPreferences
    },

    setDisplayName(state, action: PayloadAction<string>) {
      state.basic.displayName = action.payload
    },

    setEmail(state, action: PayloadAction<string>) {
      state.extra.email = action.payload
    },

    setExtra(state, action: PayloadAction<BasicUser>) {
      state.extra = action.payload
    },

    setIsOrganization(state, action: PayloadAction<boolean>) {
      state.basic.isOrganization = action.payload
    },

    setLocation(state, action: PayloadAction<DBLocationObject>) {
      state.extra.location = action.payload
    },

    setLocationCoordinates(state, action: PayloadAction<DBCoordinateObject>) {
      state.extra.location = {
        ...locationSchema,
        ...state.extra.location,
        coordinates: action.payload,
      }
    },

    setMetricUnits(state, action: PayloadAction<boolean>) {
      state.preferences.useMetricUnits = action.payload
    },

    setPastPosts(state, action: PayloadAction<BasicLitten[]>) {
      state.saved.pastPosts = action.payload
    },

    setPhoneNumber(state, action: PayloadAction<string>) {
      state.extra.phoneNumber = action.payload
    },

    setPhotoURL(state, action: PayloadAction<string>) {
      state.basic.photoURL = action.payload
    },

    setShareMetrics(state, action: PayloadAction<boolean>) {
      state.preferences.shareMetrics = action.payload
    },
  },
})

export const {
  addFavouriteFilter,
  addFavouriteLitten,
  addSavedSearch,
  clearBasic,
  clearExtra,
  clearSavedSearch,
  removeFavouriteFilter,
  removeFavouriteLitten,
  removeFavouriteWithIndex,
  removeSavedSearch,
  setActivePosts,
  setBasic,
  setContactPreferences,
  setDisplayName,
  setEmail,
  setExtra,
  setIsOrganization,
  setLocation,
  setLocationCoordinates,
  setMetricUnits,
  setPastPosts,
  setPhoneNumber,
  setPhotoURL,
  setShareMetrics,
} = authenticatedUserSlice.actions

export default authenticatedUserSlice.reducer
