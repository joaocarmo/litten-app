export const FORM_NEW_CLEAR = 'FORM_NEW_CLEAR'
export const FORM_NEW_SET_TITLE = 'FORM_NEW_SET_TITLE'
export const FORM_NEW_SET_TYPE = 'FORM_NEW_SET_TYPE'
export const FORM_NEW_SET_STORY = 'FORM_NEW_SET_STORY'
export const FORM_NEW_SET_LOCATION = 'FORM_NEW_SET_LOCATION'
export const FORM_NEW_ADD_PHOTO = 'FORM_NEW_ADD_PHOTO'
export const FORM_NEW_UPDATE_PHOTO = 'FORM_NEW_UPDATE_PHOTO'
export const FORM_NEW_REMOVE_PHOTO = 'FORM_NEW_REMOVE_PHOTO'

export function clearNewForm() {
  return {
    type: FORM_NEW_CLEAR,
  }
}

export function setTitle(title) {
  return {
    type: FORM_NEW_SET_TITLE,
    payload: title,
  }
}

export function setType(type) {
  return {
    type: FORM_NEW_SET_TYPE,
    payload: type,
  }
}

export function setStory(story) {
  return {
    type: FORM_NEW_SET_STORY,
    payload: story,
  }
}

export function setLocation(location) {
  return {
    type: FORM_NEW_SET_LOCATION,
    payload: location,
  }
}

export function addPhoto(photo) {
  return {
    type: FORM_NEW_ADD_PHOTO,
    payload: photo,
    index: null,
  }
}

export function updatePhoto(photo, index) {
  return {
    type: FORM_NEW_UPDATE_PHOTO,
    payload: photo,
    index,
  }
}

export function removePhoto(index) {
  return {
    type: FORM_NEW_REMOVE_PHOTO,
    payload: null,
    index,
  }
}
