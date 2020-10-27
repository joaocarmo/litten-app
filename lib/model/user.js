/**
 * @format
 * @flow
 */

import storage from '@react-native-firebase/storage'
import firestore from 'db/firestore'
import Auth from './auth'
import Litten from './litten'
import Search from './search'
import type { UserClass } from './types/user'
import { logError } from 'utils/functions'
import {
  DB_USER_COLLECTION,
  STORAGE_USER_AVATAR,
  STORAGE_OBJECT_NOT_FOUND,
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

export type BasicUser = {
  id: string,
  displayName: string,
  isOrganization: boolean,
  photoURL: string | { uri: string },
  userUid: string,
}

export default class User implements UserClass {
  #search
  #currentUser
  #id
  #userUid
  #displayName
  #photoURL
  #isOrganization

  constructor({
    id,
    displayName,
    isOrganization,
    photoURL,
    userUid,
  }: BasicUser = {}) {
    this.#search = new Search()
    this.#currentUser = new Auth().currentUser
    this.#id = id
    this.#displayName = displayName
    this.#isOrganization = isOrganization
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
    this.#userUid = this.#currentUser ? this.#currentUser.uid : userUid
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
    if (this.#userUid) {
      const fileExt = 'jpg'
      return `${STORAGE_USER_AVATAR}/${this.#userUid}.${fileExt}`
    }
    return ''
  }

  get isOrganization() {
    return this.#isOrganization
  }

  set isOrganization(value: boolean) {
    if (this.#isOrganization === value) {
      return
    }
    this.#isOrganization = value
    this.updateOne('isOrganization', value)
  }

  async updateOne(field: string, value: any) {
    if (this.#id) {
      return await this.collection.doc(this.#id).update({ [field]: value })
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
    if (this.#userUid) {
      const ids = []
      const users = await this.collection
        .where('userUid', '==', this.#userUid)
        .get()
      users.docs.forEach((documentSnapshot) => {
        ids.push(documentSnapshot.id)
      })
      for (const id of ids) {
        await this.collection.doc(id).delete()
      }
    }
  }

  async deleteAuth() {
    if (this.#currentUser) {
      await this.#currentUser.delete()
    }
  }

  async delete({ password }: { password: string }) {
    if (password) {
      const provider = Auth.provider
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
