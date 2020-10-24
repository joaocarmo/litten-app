/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import { locationSchema } from 'db/schemas/location'
import { DB_LITTEN_COLLECTION, STORAGE_LITTEN_PHOTOS } from 'utils/constants'
import Auth from './auth'
import type { BasicLitten, LittenClass } from './types/litten'

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
  #id = null
  #active = true
  #location = locationSchema
  #photos = []
  #species = ''
  #story = ''
  #title = ''
  #type = ''
  #metadata = {
    createdAt: null,
    updatedAt: null,
  }
  #user = null

  constructor({
    active = true,
    location,
    photos,
    species,
    story,
    title,
    type,
    user,
  }: BasicLitten) {
    this.#active = active
    this.#location = location
    this.#photos = photos
    this.#species = species
    this.#story = story
    this.#title = title
    this.#type = type
    this.#user = user ?? new Auth()
  }

  get active() {
    return this.#active
  }

  get location() {
    return this.#location
  }

  get photos() {
    return this.#photos
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

  get collection() {
    return firestore().collection(DB_LITTEN_COLLECTION)
  }

  buildLocation() {
    const {
      coordinates: { latitude = 0, longitude = 0 },
      ...location
    } = this.#location
    return {
      ...location,
      coordinates: new firestore.GeoPoint(latitude, longitude),
    }
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

  buildObject() {
    const littenObject = {
      active: this.#active,
      location: this.buildLocation(),
      photos: [],
      species: this.#species,
      story: this.#story,
      title: this.#title,
      type: this.#type,
      user: {
        userUid: this.#user?.userUid,
      },
      metadata: {
        createdAt:
          this.#metadata.createdAt ?? firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    }
    return littenObject
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
}
