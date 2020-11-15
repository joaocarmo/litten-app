/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import type { DBCoordinateObject, DBLocationObject } from 'db/schemas/location'
import { logError } from 'utils/functions'
import Auth from './auth'
import Base from './base'
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
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserError)
    }

    this.name = 'UserError'
  }
}

export default class User extends Base implements UserClass {
  #auth
  #contactPreferences
  #currentUser
  #displayName
  #email
  #emailVerified
  #isOrganization
  #phoneNumber
  #photoURL
  #search
  #userAuthUid

  constructor(basicUser: BasicUser) {
    super()

    const {
      id = '',
      contactPreferences = [USER_PREFERENCES_CONTACT_INAPP],
    } = basicUser
    this.mapDocToProps(basicUser)
    this.#search = new Search({ user: { id } })
    this.#auth = new Auth({})
    this.#currentUser = this.#auth.currentUser
    this.#contactPreferences = contactPreferences
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

  get emailVerified() {
    return this.#emailVerified
  }

  get userAuthUid() {
    return this.#userAuthUid
  }

  get photoURL() {
    return this.#photoURL
  }

  get location() {
    return super.location
  }

  get coordinates() {
    return super.coordinates
  }

  get photoURLRef() {
    if (this.id) {
      const fileExt = 'jpg'
      return `${STORAGE_USER_AVATAR}/${this.id}.${fileExt}`
    }
    return ''
  }

  get phoneNumber() {
    return this.#phoneNumber
  }

  get isOrganization() {
    return this.#isOrganization
  }

  get contactPreferences() {
    return this.#contactPreferences
  }

  set displayName(displayName: string | void = '') {
    if (displayName) {
      this.#displayName = displayName
      this.updateOne('displayName', displayName)

      if (this.#currentUser) {
        this.#auth.displayName = displayName
      }
    }
  }

  set email(email: string | void = '') {
    if (email) {
      this.#email = email
      this.emailVerified = false
      this.updateOne('email', email)

      if (this.#currentUser) {
        this.#auth.email = email
      }
    }
  }

  set emailVerified(emailVerified: boolean | void = false) {
    this.#emailVerified = emailVerified
    this.updateOne('emailVerified', emailVerified)
  }

  set userAuthUid(userAuthUid: string | void = '') {
    this.#userAuthUid = userAuthUid
    this.updateOne('userAuthUid', userAuthUid)
  }

  set photoURL(photoURL: string | void = '') {
    if (photoURL) {
      this.deletePhoto()
      this.uploadAndSetPhoto(photoURL)
    } else {
      this.#photoURL = photoURL
      this.updateOne('photoURL', photoURL)

      if (this.#currentUser) {
        this.#auth.photoURL = photoURL
      }
    }
  }

  set phoneNumber(phoneNumber: string | void = '') {
    this.#phoneNumber = phoneNumber
    this.updateOne('phoneNumber', phoneNumber)
  }

  set location(location: DBLocationObject = {}) {
    super.location = location

    this.updateOne('location', super.buildLocation())
  }

  set coordinates(coordinates: DBCoordinateObject) {
    super.coordinates = coordinates

    const { latitude, longitude } = coordinates
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

  async uploadAndSetPhoto(photoURL: string) {
    if (this.#currentUser) {
      try {
        this.#photoURL = await this.#auth.uploadAndSetPhoto(photoURL)
        this.updateOne('photoURL', this.#photoURL)
      } catch (err) {
        logError(err)
      }
    }
  }

  buildObject() {
    const userObject = {
      contactPreferences: this.#contactPreferences,
      displayName: this.#displayName,
      email: this.#email,
      emailVerified: this.#emailVerified,
      isOrganization: this.#isOrganization,
      location: this.buildLocation(),
      phoneNumber: this.#phoneNumber,
      photoURL: this.#photoURL,
      userAuthUid: this.#userAuthUid,
      metadata: this.buildMetadata(),
    }
    return userObject
  }

  mapDocToProps({
    contactPreferences = [],
    displayName = '',
    email = '',
    emailVerified = false,
    isOrganization = false,
    phoneNumber = '',
    photoURL = '',
    userAuthUid = '',
    ...otherProps
  }: BasicUser) {
    super.mapCommonProps(otherProps)

    this.#contactPreferences = contactPreferences
    this.#displayName = displayName
    this.#email = email
    this.#emailVerified = emailVerified
    this.#isOrganization = isOrganization
    this.#phoneNumber = phoneNumber
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
    this.#userAuthUid = userAuthUid
  }

  async reauthenticate(password: string) {
    const provider = Auth.emailProvider
    const email = this.#currentUser.email
    const authCredential = provider.credential(email, password)
    await this.#currentUser.reauthenticateWithCredential(authCredential)
  }

  async get() {
    let user

    if (this.id) {
      user = await this.collection.doc(this.id).get()
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
    this.id = newUser.id
    const newUserObject = {
      ...userObject,
      id: this.id,
    }
    return newUserObject
  }

  async updateOne(field: string, value: any) {
    if (this.id && this.#userAuthUid === this.#currentUser.uid) {
      return await this.collection.doc(this.id).update({
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
    if (this.id) {
      await this.collection.doc(this.id).delete()
    }
  }

  async deleteAuth() {
    if (this.#currentUser) {
      await this.#currentUser.delete()
    }
  }

  async delete() {
    await this.deleteLittens()
    await this.deletePhoto()
    await this.deleteUser()
    await this.deleteAuth()
  }
}
