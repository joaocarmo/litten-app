/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import type { DBCoordinateObject, DBLocationObject } from 'db/schemas/location'
import { logError } from 'utils/dev'
import Auth from 'model/auth'
import Base from 'model/base'
import Litten from 'model/litten'
import Search from 'model/search'
import type { BasicUser, UserClass } from 'model/types/user'
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
  #isOrganization
  #phoneNumber
  #photoURL
  #search

  constructor(basicUser: BasicUser) {
    super()

    const {
      id = '',
      contactPreferences = [USER_PREFERENCES_CONTACT_INAPP],
    } = basicUser
    this.mapDocToProps(basicUser)
    this.id = id
    this.#search = new Search({ user: { id } })
    this.#auth = new Auth({})
    this.#currentUser = this.#auth.currentUser
    this.#contactPreferences = contactPreferences
  }

  get firestore() {
    return firestore
  }

  get collection() {
    return this.firestore().collection(DB_USER_COLLECTION)
  }

  get storage() {
    return storage
  }

  get displayName() {
    return this.#displayName
  }

  get email() {
    return this.#email
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
      this.updateOne('email', email)

      if (this.#currentUser) {
        this.#auth.email = email
      }
    }
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
      new this.firestore.GeoPoint(latitude, longitude),
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
          this.firestore.FieldValue.arrayRemove(value),
        )
      } else {
        newContactPreferences.push(value)
        this.updateOne(
          'contactPreferences',
          this.firestore.FieldValue.arrayUnion(value),
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

  buildObject(): BasicUser {
    const userObject = {
      contactPreferences: this.#contactPreferences,
      displayName: this.#displayName,
      email: this.#email,
      isOrganization: this.#isOrganization,
      location: this.buildLocation(),
      phoneNumber: this.#phoneNumber,
      photoURL: this.#photoURL,
      metadata: this.buildMetadata(),
    }
    return userObject
  }

  mapDocToProps({
    contactPreferences = [],
    displayName = '',
    email = '',
    isOrganization = false,
    phoneNumber = '',
    photoURL = '',
    ...otherProps
  }: BasicUser) {
    super.mapCommonProps(otherProps)

    this.#contactPreferences = contactPreferences
    this.#displayName = displayName
    this.#email = email
    this.#isOrganization = isOrganization
    this.#phoneNumber = phoneNumber
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
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
    }

    if (user) {
      this.mapDocToProps({ ...user.data(), id: user.id })
    }
  }

  async create() {
    if (this.id) {
      const userObject = this.buildObject()

      await this.collection.doc(this.id).set(userObject)

      const newUserObject = {
        ...userObject,
        id: this.id,
      }

      return newUserObject
    }

    return null
  }

  async updateOne(field: string, value: any) {
    if (this.id) {
      return await this.collection.doc(this.id).update({
        [field]: value,
        'metadata.updatedAt': this.firestore.FieldValue.serverTimestamp(),
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
    const fileRef = this.storage().ref(this.photoURLRef)
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
