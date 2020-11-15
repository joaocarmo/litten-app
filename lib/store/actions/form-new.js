/**
 * @format
 * @flow
 */

import type {
  GenericActionCreator,
  PhotoObject,
  PhotoAction,
} from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'

export const FORM_NEW_ADD_PHOTO = 'FORM_NEW_ADD_PHOTO'
export const FORM_NEW_CLEAR = 'FORM_NEW_CLEAR'
export const FORM_NEW_REMOVE_PHOTO = 'FORM_NEW_REMOVE_PHOTO'
export const FORM_NEW_SET_LOCATION = 'FORM_NEW_SET_LOCATION'
export const FORM_NEW_SET_SPECIES = 'FORM_NEW_SET_SPECIES'
export const FORM_NEW_SET_STORY = 'FORM_NEW_SET_STORY'
export const FORM_NEW_SET_TITLE = 'FORM_NEW_SET_TITLE'
export const FORM_NEW_SET_TYPE = 'FORM_NEW_SET_TYPE'
export const FORM_NEW_SET_USE_EXTRA_INFO = 'FORM_NEW_SET_USE_EXTRA_INFO'
export const FORM_NEW_UPDATE_PHOTO = 'FORM_NEW_UPDATE_PHOTO'

export function clearNewForm(): GenericActionCreator<void> {
  return {
    type: FORM_NEW_CLEAR,
  }
}

export function setTitle(title: string): GenericActionCreator<string> {
  return {
    type: FORM_NEW_SET_TITLE,
    payload: title,
  }
}

export function setSpecies(species: string): GenericActionCreator<string> {
  return {
    type: FORM_NEW_SET_SPECIES,
    payload: species,
  }
}

export function setType(type: string): GenericActionCreator<string> {
  return {
    type: FORM_NEW_SET_TYPE,
    payload: type,
  }
}

export function setUseExtraInfo(
  useExtraInfo: boolean,
): GenericActionCreator<boolean> {
  return {
    type: FORM_NEW_SET_USE_EXTRA_INFO,
    payload: useExtraInfo,
  }
}

export function setStory(story: string): GenericActionCreator<string> {
  return {
    type: FORM_NEW_SET_STORY,
    payload: story,
  }
}

export function setLocation(
  location: DBLocationObject,
): GenericActionCreator<any> {
  return {
    type: FORM_NEW_SET_LOCATION,
    payload: location,
  }
}

export function addPhoto(photo: PhotoObject): PhotoAction {
  return {
    type: FORM_NEW_ADD_PHOTO,
    payload: photo,
    index: null,
  }
}

export function updatePhoto(photo: PhotoObject, index: number): PhotoAction {
  return {
    type: FORM_NEW_UPDATE_PHOTO,
    payload: photo,
    index,
  }
}

export function removePhoto(index: number): PhotoAction {
  return {
    type: FORM_NEW_REMOVE_PHOTO,
    payload: null,
    index,
  }
}

export const FormNewActions = {
  addPhoto,
  clearNewForm,
  removePhoto,
  setLocation,
  setSpecies,
  setStory,
  setTitle,
  setType,
  setUseExtraInfo,
  updatePhoto,
}
