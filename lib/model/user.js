/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import type { DBCoordinateObject } from 'db/schemas/location'
import { locationSchema } from 'db/schemas/location'
import { logError } from 'utils/functions'
import Auth from './auth'
import Litten from './litten'
import Search from './search'
import type { BasicUser, UserClass } from './types/user'
import {
  DB_USER_COLLECTION,
  STORAGE_OBJECT_NOT_FOUND,
  STORAGE_USER_AVATAR,
} from 'utils/constants'

export class UserError extends Error {
  constructor(...args: any) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserError)
    }

    this.name = 'UserError'
  }
}

export default class User implements UserClass {
  #search
  #currentUser
  #id
  #displayName
  #isOrganization
  #location
  #metadata
  #phoneNumber
  #photoURL
  #userAuthUid

  constructor({
    id = null,
    displayName = '',
    isOrganization = false,
    location = locationSchema,
    metadata = {
      createdAt: null,
      updatedAt: null,
    },
    phoneNumber = '',
    photoURL = '',
    userAuthUid = null,
  }: BasicUser) {
    this.#search = new Search({ user: { id } })
    this.#currentUser = new Auth().currentUser
    this.#id = id
    this.#displayName = displayName
    this.#isOrganization = isOrganization
    this.#location = { ...locationSchema, ...location }
    this.#metadata = metadata
    this.#phoneNumber = phoneNumber
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
    this.#userAuthUid = userAuthUid || this.#currentUser?.uid
  }

  get collection() {
    return firestore().collection(DB_USER_COLLECTION)
  }

  get storage() {
    return storage()
  }

  get displayName() {
    return this.#displayName
  }

  get photoURL() {
    return this.#photoURL
  }

  get photoURLRef() {
    if (this.#id) {
      const fileExt = 'jpg'
      return `${STORAGE_USER_AVATAR}/${this.#id}.${fileExt}`
    }
    return ''
  }

  get coordinates() {
    return this.#location.coordinates
  }

  get isOrganization() {
    return this.#isOrganization
  }

  set coordinates({ latitude, longitude }: DBCoordinateObject) {
    this.#location.coordinates = { latitude, longitude }
    this.updateOne(
      'location.coordinates',
      new firestore.GeoPoint(latitude, longitude),
    )
  }

  set isOrganization(isOrganization: boolean) {
    this.#isOrganization = isOrganization
    this.updateOne('isOrganization', isOrganization)
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
    const userObject = {
      displayName: this.#displayName,
      isOrganization: this.#isOrganization,
      location: this.buildLocation(),
      phoneNumber: this.#phoneNumber,
      photoURL: this.#photoURL,
      userAuthUid: this.#userAuthUid,
      metadata: {
        createdAt:
          this.#metadata?.createdAt ?? firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    }
    return userObject
  }

  toJSON() {
    const object = this.buildObject()
    object.location.coordinates = {
      latitude: object.location.coordinates._latitude,
      longitude: object.location.coordinates._longitude,
    }
    object.metadata = {
      createdAt: {
        seconds: object.metadata.createdAt._seconds,
      },
      updatedAt: {
        seconds: object.metadata.updatedAt._seconds,
      },
    }
    return { id: this.#id, key: this.#id, ...object }
  }

  mapDocToProps({
    displayName,
    id,
    isOrganization,
    location,
    metadata,
    phoneNumber,
    photoURL,
    userAuthUid,
  }: BasicUser) {
    this.#id = id
    this.#displayName = displayName
    this.#isOrganization = isOrganization
    this.#location = { ...locationSchema, ...location }
    this.#phoneNumber = phoneNumber
    this.#photoURL = photoURL
    this.#userAuthUid = userAuthUid
    this.#metadata = metadata
  }

  async get() {
    let user

    if (this.#id) {
      user = await this.collection.doc(this.#id).get()
    } else if (this.#userAuthUid) {
      const results = await this.collection
        .where('userAuthUid', '==', this.#userAuthUid)
        .limit(1)
        .get()
      if (!results.empty) {
        user = results.docs[0]
      }
    }

    if (user) {
      this.mapDocToProps({ ...user.data(), id: user.id })
    }
  }

  async create() {
    const userObject = this.buildObject()
    const newUser = await this.collection.add(userObject)
    this.#id = newUser.id
    const newUserObject = {
      ...userObject,
      id: this.#id,
    }
    return newUserObject
  }

  async updateOne(field: string, value: any) {
    if (this.#id) {
      return await this.collection.doc(this.#id).update({
        [field]: value,
        'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
      })
    }
  }

  async deleteLittens() {
    const ids = []
    const activePosts = await this.#search?.userPostsQuery(true).get()
    const inactivePosts = await this.#search?.userPostsQuery(false).get()
    activePosts?.docs.forEach((documentSnapshot) => {
      ids.push(documentSnapshot.id)
    })
    inactivePosts?.docs.forEach((documentSnapshot) => {
      ids.push(documentSnapshot.id)
    })
    for (const id of ids) {
      const litten = new Litten({ id })
      await litten.delete()
    }
  }

  async deletePhoto() {
    const fileRef = this.storage.ref(this.photoURLRef)
    try {
      await fileRef.delete()
    } catch (err) {
      if (err.code === STORAGE_OBJECT_NOT_FOUND) {
        logError(err.code)
      } else {
        throw new UserError(err)
      }
    }
  }

  async deleteUser() {
    if (this.#id) {
      await this.collection.doc(this.#id).delete()
    }
  }

  async deleteAuth() {
    if (this.#currentUser) {
      await this.#currentUser.delete()
    }
  }

  async delete({ password }: { password: string }) {
    if (password) {
      const provider = Auth.emailProvider
      const email = this.#currentUser.email
      const authCredential = provider.credential(email, password)
      await this.#currentUser.reauthenticateWithCredential(authCredential)
      await this.deleteLittens()
      await this.deletePhoto()
      await this.deleteUser()
      await this.deleteAuth()
    }
  }
}
