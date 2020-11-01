/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import type { DBLocationObject, DBCoordinateObject } from 'db/schemas/location'
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
  USER_PREFERENCES_CONTACT_INAPP,
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
  #contactPreferences
  #displayName
  #email
  #isOrganization
  #location
  #metadata
  #phoneNumber
  #photoURL
  #userAuthUid

  constructor({
    id = null,
    contactPreferences = [USER_PREFERENCES_CONTACT_INAPP],
    displayName = '',
    email = '',
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
    this.#contactPreferences = contactPreferences
    this.#displayName = displayName
    this.#email = email
    this.#isOrganization = isOrganization
    this.#location = { ...locationSchema, ...location }
    this.#metadata = metadata
    this.#phoneNumber = phoneNumber
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
    this.#userAuthUid = userAuthUid
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

  get email() {
    return this.#email
  }

  get userAuthUid() {
    return this.#userAuthUid
  }

  get metadata() {
    return this.#metadata
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

  get phoneNumber() {
    return this.#phoneNumber
  }

  get location() {
    return this.#location
  }

  get coordinates() {
    return this.#location.coordinates
  }

  get isOrganization() {
    return this.#isOrganization
  }

  get contactPreferences() {
    return this.#contactPreferences
  }

  set displayName(displayName: string | void = '') {
    this.#displayName = displayName
  }

  set email(email: string | void = '') {
    this.#email = email
  }

  set metadata(metadata: any) {
    this.#metadata = metadata
  }

  set userAuthUid(userAuthUid: string | void = '') {
    this.#userAuthUid = userAuthUid
  }

  set photoURL(photoURL: string | { uri: string } | void = '') {
    this.#photoURL = photoURL
  }

  set location(location: DBLocationObject | void = {}) {
    this.#location = { ...locationSchema, ...location }
  }

  set phoneNumber(phoneNumber: string | void = '') {
    this.#phoneNumber = phoneNumber
    this.updateOne('phoneNumber', phoneNumber)
  }

  set coordinates({ latitude, longitude }: DBCoordinateObject) {
    this.#location.coordinates = { latitude, longitude }
    this.updateOne(
      'location.coordinates',
      new firestore.GeoPoint(latitude, longitude),
    )
  }

  set isOrganization(isOrganization: boolean = false) {
    this.#isOrganization = isOrganization
    this.updateOne('isOrganization', isOrganization)
  }

  set contactPreferences(value: string | string[] | void) {
    if (Array.isArray(value)) {
      this.#contactPreferences = value
    } else if (value) {
      let newContactPreferences: string[] = [...this.#contactPreferences]
      if (this.#contactPreferences.includes(value)) {
        newContactPreferences = this.#contactPreferences.filter(
          (element) => element !== value,
        )
        this.updateOne(
          'contactPreferences',
          firestore.FieldValue.arrayRemove(value),
        )
      } else {
        newContactPreferences.push(value)
        this.updateOne(
          'contactPreferences',
          firestore.FieldValue.arrayUnion(value),
        )
      }
      this.#contactPreferences = newContactPreferences
    }
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
      contactPreferences: this.#contactPreferences,
      displayName: this.#displayName,
      email: this.#email,
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

  toJSON(): BasicUser {
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
    id,
    contactPreferences = [],
    displayName,
    email,
    isOrganization,
    location,
    metadata,
    phoneNumber,
    photoURL,
    userAuthUid,
  }: BasicUser) {
    this.#id = id
    this.#contactPreferences = contactPreferences
    this.#displayName = displayName
    this.#email = email
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
    if (this.#id && this.#userAuthUid === this.#currentUser.uid) {
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
