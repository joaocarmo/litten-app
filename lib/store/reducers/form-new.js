import {
  FORM_NEW_CLEAR,
  FORM_NEW_SET_TITLE,
  FORM_NEW_SET_TYPE,
  FORM_NEW_SET_STORY,
  FORM_NEW_SET_LOCATION,
  FORM_NEW_ADD_PHOTO,
  FORM_NEW_UPDATE_PHOTO,
  FORM_NEW_REMOVE_PHOTO,
} from 'store/actions/form-new'
import produce from 'immer'

const defaultState = {
  photos: [],
  title: '',
  type: '',
  story: '',
  location: null,
}

const formNew = produce((draft, action) => {
  switch (action.type) {
    case FORM_NEW_CLEAR:
      return defaultState
    case FORM_NEW_SET_TITLE:
      draft.title = action.payload
      break
    case FORM_NEW_SET_TYPE:
      draft.type = action.payload
      break
    case FORM_NEW_SET_STORY:
      draft.story = action.payload
      break
    case FORM_NEW_SET_LOCATION:
      draft.location = action.payload
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
}, defaultState)

export default formNew
