/**
 * @format
 * @flow
 */

import produce from 'immer'
import type { NewForm } from 'store/types'
import {
  FORM_NEW_ADD_PHOTO,
  FORM_NEW_CLEAR,
  FORM_NEW_REMOVE_PHOTO,
  FORM_NEW_SET_LOCATION,
  FORM_NEW_SET_STORY,
  FORM_NEW_SET_TITLE,
  FORM_NEW_SET_TYPE,
  FORM_NEW_SET_USE_EXTRA_INFO,
  FORM_NEW_UPDATE_PHOTO,
} from 'store/actions/form-new'
import { locationSchema } from 'db/schemas/location'

const initialState: NewForm = {
  photos: [],
  title: '',
  type: '',
  story: '',
  location: locationSchema,
  useExtraInfo: false,
}

const formNew = produce<NewForm>((draft: NewForm, action: any) => {
  switch (action.type) {
    case FORM_NEW_CLEAR:
      return initialState
    case FORM_NEW_SET_TITLE:
      draft.title = action.payload
      break
    case FORM_NEW_SET_TYPE:
      draft.type = action.payload
      break
    case FORM_NEW_SET_STORY:
      draft.story = action.payload
      break
    case FORM_NEW_SET_USE_EXTRA_INFO:
      draft.useExtraInfo = action.payload
      break
    case FORM_NEW_SET_LOCATION:
      draft.location = { ...locationSchema, ...action.payload }
      break
    case FORM_NEW_ADD_PHOTO:
      draft.photos.push(action.payload)
      break
    case FORM_NEW_UPDATE_PHOTO:
      draft.photos.splice(action.index, 1, action.payload)
      break
    case FORM_NEW_REMOVE_PHOTO:
      draft.photos.splice(action.index, 1)
      break
    default:
      return draft
  }
}, initialState)

export default formNew
