/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import { locationSchema } from 'db/schemas/location'
import type { BasicLitten, LittenClass } from './types/litten'
import type { BasicUser } from './types/user'
import { logError } from 'utils/functions'
import {
  DB_LITTEN_COLLECTION,
  DB_USER_KEY_ID,
  STORAGE_LITTEN_PHOTOS,
} from 'utils/constants'

export class LittenError extends Error {
  constructor(...args: any) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LittenError)
    }

    this.name = 'LittenError'
  }
}

export default class Litten implements LittenClass {
  #id
  #active
  #location
  #photos
  #species
  #story
  #title
  #type
  #metadata
  #user
  #userUid

  constructor({
    id = null,
    active = true,
    location = locationSchema,
    photos = [],
    species = '',
    story = '',
    title = '',
    type = '',
    metadata = {
      createdAt: null,
      updatedAt: null,
    },
    user = null,
    userUid = '',
  }: BasicLitten) {
    this.#id = id
    this.#active = active
    this.#location = { ...locationSchema, ...location }
    this.#photos = photos
    this.#species = species
    this.#story = story
    this.#title = title
    this.#type = type
    this.#metadata = metadata
    this.#user = user
    this.#userUid = userUid || this.#user?.id
  }

  get collection() {
    return firestore().collection(DB_LITTEN_COLLECTION)
  }

  get storage() {
    return storage()
  }

  get storageRef() {
    if (this.#id) {
      return `${STORAGE_LITTEN_PHOTOS}/${this.#id}`
    }
    return ''
  }

  get id() {
    return this.#id
  }

  get active() {
    return this.#active
  }

  get location() {
    return this.#location
  }

  get coordinates() {
    const {
      coordinates: { latitude, longitude, _latitude, _longitude },
    } = this.#location
    return {
      latitude: _latitude ?? latitude,
      longitude: _longitude ?? longitude,
    }
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

  get metadata() {
    return this.#metadata
  }

  get createdAt() {
    if (this.#metadata.createdAt) {
      return this.#metadata.createdAt.seconds * 1000
    }
  }

  get updatedAt() {
    if (this.#metadata.updatedAt) {
      return this.#metadata.updatedAt.seconds * 1000
    }
  }

  get userUid() {
    return this.#userUid
  }

  get contactPreferences() {
    return this.#user?.contactPreferences || []
  }

  set user(user: BasicUser) {
    this.#user = user
  }

  buildLocation() {
    const {
      coordinates: { latitude, longitude },
      ...location
    } = this.#location
    return {
      ...location,
      coordinates: new firestore.GeoPoint(latitude ?? 0, longitude ?? 0),
    }
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
      metadata: {
        createdAt:
          this.#metadata.createdAt ?? firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    }
    return littenObject
  }

  toJSON() {
    const object = this.buildObject()
    object.location.coordinates = {
      latitude: object.location.coordinates._latitude,
      longitude: object.location.coordinates._longitude,
    }
    object.metadata = {
      createdAt: {
        seconds: object.metadata.createdAt.seconds,
      },
      updatedAt: {
        seconds: object.metadata.updatedAt.seconds,
      },
    }
    return { id: this.#id, key: this.#id, ...object }
  }

  async savePhoto(fileURI: string, docId: string) {
    if (typeof fileURI === 'string') {
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
        const photoURL = await this.savePhoto(photo?.uri, docId)
        if (photoURL) {
          photos.push(photoURL)
        }
      }
    }
    await doc.update({ photos })
  }

  async create() {
    try {
      const littenObject = this.buildObject()
      const doc = await this.collection.add(littenObject)
      await this.savePhotos(doc)
    } catch (err) {
      throw new LittenError(err)
    }
  }

  async update() {}

  async save() {
    if (this.#id) {
      await this.update()
    } else {
      await this.create()
    }
  }

  async toggleActive(active: boolean = true) {
    if (this.#id) {
      try {
        await this.collection.doc(this.#id).update({
          active,
          'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
        })
      } catch (err) {
        throw new LittenError(err)
      }
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
    if (this.#id) {
      try {
        await this.collection.doc(this.#id).delete()
        this.deletePhotos()
      } catch (err) {
        throw new LittenError(err)
      }
    }
  }
}
