/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import Base from 'model/base'
import type { BasicLitten, LittenClass } from 'model/types/litten'
import type { BasicUser } from 'model/types/user'
import type { PhotoObject } from 'store/types'
import { logError } from 'utils/dev'
import {
  DB_LITTEN_COLLECTION,
  DB_USER_KEY_ID,
  STORAGE_LITTEN_PHOTOS,
} from 'utils/constants'

export class LittenError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LittenError)
    }

    this.name = 'LittenError'
  }
}

export default class Litten extends Base implements LittenClass {
  #active
  #photos
  #species
  #story
  #title
  #type
  #user
  #userUid

  constructor({ user = null, ...basicLitten }: BasicLitten) {
    super()

    this.mapDocToProps(basicLitten)
    this.#user = user
    this.#userUid = this.#userUid || this.#user?.id
  }

  get collection() {
    return firestore().collection(DB_LITTEN_COLLECTION)
  }

  get storage() {
    return storage()
  }

  get storageRef() {
    if (this.id) {
      return `${STORAGE_LITTEN_PHOTOS}/${this.id}`
    }
    return ''
  }

  get active() {
    return this.#active
  }

  get photos() {
    return this.#photos ?? []
  }

  get mainPhoto() {
    return this.photos[0]
  }

  get species() {
    return this.#species
  }

  get story() {
    return this.#story
  }

  get title() {
    return this.#title
  }

  get type() {
    return this.#type
  }

  get userUid() {
    return this.#userUid
  }

  get user() {
    return this.#user
  }

  get contactPreferences() {
    return this.#user?.contactPreferences || []
  }

  set active(active: boolean = true) {
    this.#active = active
  }

  set photos(photos: PhotoObject[] = []) {
    this.#photos = photos
  }

  set species(species: string = '') {
    this.#species = species
  }

  set story(story: string = '') {
    this.#story = story
  }

  set title(title: string = '') {
    this.#title = title
  }

  set type(type: string = '') {
    this.#type = type
  }

  set userUid(userUid: string = '') {
    this.#userUid = userUid
  }

  set user(user: BasicUser = {}) {
    this.#user = user
  }

  buildObject() {
    const littenObject = {
      active: this.#active,
      location: this.buildLocation(),
      photos: this.#photos,
      species: this.#species,
      story: this.#story,
      title: this.#title,
      type: this.#type,
      [DB_USER_KEY_ID]: this.#userUid,
      metadata: this.buildMetadata(),
    }
    return littenObject
  }

  mapDocToProps({
    active = true,
    photos = [],
    species = '',
    story = '',
    title = '',
    type = '',
    userUid = '',
    ...otherProps
  }: BasicLitten) {
    super.mapCommonProps(otherProps)

    this.#active = active
    this.#photos = photos
    this.#species = species
    this.#story = story
    this.#title = title
    this.#type = type
    this.#userUid = userUid
  }

  async get() {
    if (this.id) {
      const litten = await this.collection.doc(this.id).get()

      if (litten) {
        this.mapDocToProps({ ...litten.data(), id: litten.id })
      }
    }
  }

  async savePhoto(fileURI: string, docId: string) {
    if (typeof fileURI === 'string') {
      if (process.env.NODE_ENV === 'development') {
        return fileURI
      }

      const filename = fileURI.split('/').pop()
      const strRef = `${STORAGE_LITTEN_PHOTOS}/${docId}/${filename}`
      const storageRef = storage().ref(strRef)
      await storageRef.putFile(fileURI)
      const downloadURL = await storageRef.getDownloadURL()
      return downloadURL
    }
  }

  async savePhotos(doc: any) {
    const docId = doc.id
    const photos = []
    for (const photo of this.#photos) {
      if (typeof photo?.uri === 'string') {
        try {
          const photoURL = await this.savePhoto(photo?.uri, docId)
          if (photoURL) {
            photos.push(photoURL)
          }
        } catch (err) {
          logError(err)
        }
      }
    }
    await doc.update({ photos })
    this.#photos = photos
  }

  async create() {
    if (this.#user) {
      throw new LittenError('Email is not verified')
    }
    try {
      const littenObject = this.buildObject()
      const doc = await this.collection.add(littenObject)
      this.id = doc.id
      await this.savePhotos(doc)
    } catch (err) {
      throw new LittenError(err)
    }
  }

  async update() {}

  async save() {
    if (this.id) {
      await this.update()
    } else {
      await this.create()
    }
  }

  async toggleActive(active: boolean = true) {
    if (this.id) {
      try {
        await this.collection.doc(this.id).update({
          active,
          'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
        })
      } catch (err) {
        throw new LittenError(err)
      }
      this.active = active
    }
  }

  async archive() {
    await this.toggleActive(false)
  }

  async activate() {
    await this.toggleActive(true)
  }

  async deletePhotos() {
    try {
      const storageRef = this.storage.ref(this.storageRef)
      const filesRef = await storageRef.listAll()
      for (const fileRef of filesRef.items) {
        fileRef.delete()
      }
    } catch (err) {
      logError(err)
    }
  }

  async delete() {
    if (this.id) {
      try {
        await this.collection.doc(this.id).delete()
        this.deletePhotos()
      } catch (err) {
        throw new LittenError(err)
      }
    }
  }
}
