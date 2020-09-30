/**
 * @format
 * @flow
 */

import auth from '@react-native-firebase/auth'
import { parseAvatar } from 'utils/functions'
import { createNewUser, getUserFromUid } from 'db/user'
import { uploadUserAvatar } from 'db/storage'
import type { AuthClass, AuthSettings } from './types/auth'

export class AuthError extends Error {
  constructor(...args: any) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError)
    }

    this.name = 'AuthError'
  }
}

export default class Auth implements AuthClass {
  #avatar
  #callingCode = ''
  #country = ''
  #displayName = ''
  #email = ''
  #password = ''
  #phoneNumber = ''
  #userUid = ''

  constructor({
    avatar,
    callingCode,
    country,
    displayName,
    email,
    password,
    phoneNumber,
  }: AuthSettings = {}) {
    this.#avatar = avatar || null
    this.#callingCode = callingCode || ''
    this.#country = country || ''
    this.#displayName = displayName || ''
    this.#email = email || ''
    this.#password = password || ''
    this.#phoneNumber = phoneNumber || ''
  }

  // Allow direct access to the underlying library
  static _auth = auth
  _auth = auth

  static async signOut() {
    return await this._auth().signOut()
  }

  async signIn() {
    if (this.#email && this.#password) {
      await this._auth().signInWithEmailAndPassword(this.#email, this.#password)
      this.#userUid = this._auth().currentUser.uid
      await this.getUser()
    } else {
      throw new AuthError('Email and password are required to sign in')
    }
  }

  async sendPasswordResetEmail() {
    if (this.#email) {
      await this._auth().sendPasswordResetEmail(this.#email)
    } else {
      throw new AuthError('Email is required to recover password')
    }
  }

  async createUser() {
    if (this.#email && this.#password) {
      // Create the basic auth user
      await auth().createUserWithEmailAndPassword(this.#email, this.#password)
      this.#userUid = this._auth().currentUser.uid
      const downloadURL = await uploadUserAvatar(this.#avatar, {
        authUuid: this.#userUid,
      })
      // Add some personal information to the auth user
      await auth().currentUser.updateProfile({
        displayName: this.#displayName,
        photoURL: parseAvatar((downloadURL: any), { email: this.#email }),
      })
      // Create a user object to store extra user information
      await createNewUser({
        authUuid: this.#userUid,
        country: this.#country,
        phoneNumber: `${this.#callingCode}${this.#phoneNumber}`,
      })
    } else {
      throw new AuthError('Email and password are required to register')
    }
  }

  async getUser() {
    if (this.#userUid) {
      return getUserFromUid(this.#userUid)
    }
    return null
  }

  get userUid() {
    return this.#userUid
  }
}
