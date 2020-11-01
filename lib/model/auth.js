/**
 * @format
 * @flow
 */

import auth from '@react-native-firebase/auth'
import User from './user'
import { parseAvatar } from 'utils/functions'
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
  #id
  #photoURL
  #callingCode
  #country
  #displayName
  #email
  #password
  #phoneNumber

  constructor({
    id = '',
    photoURL = '',
    callingCode = '',
    country = '',
    displayName = '',
    email = '',
    password = '',
    phoneNumber = '',
  }: AuthSettings = {}) {
    const user = this.auth.currentUser
    if (user) {
      this.#id = user.uid
      this.#photoURL = user.photoURL
      this.#displayName = user.displayName
      this.#email = user.email
      this.#phoneNumber = user.phoneNumber
    } else {
      this.#id = id
      this.#photoURL = photoURL
      this.#callingCode = callingCode
      this.#country = country
      this.#displayName = displayName
      this.#email = email
      this.#password = password
      this.#phoneNumber = phoneNumber
    }
  }

  static get _auth() {
    return auth()
  }

  static async signOut() {
    return await this._auth.signOut()
  }

  static get emailProvider() {
    return auth.EmailAuthProvider
  }

  get auth() {
    return auth()
  }

  get currentUser() {
    return this.auth.currentUser
  }

  get id() {
    return this.#id
  }

  async signIn() {
    if (this.#email && this.#password) {
      await this.auth.signInWithEmailAndPassword(this.#email, this.#password)
      this.#id = this.auth.currentUser.uid
      const user = new User({ userAuthUid: this.#id })
      await user.get()
      return user
    } else {
      throw new AuthError('Email and password are required to sign in')
    }
  }

  async sendPasswordResetEmail() {
    if (this.#email) {
      await this.auth.sendPasswordResetEmail(this.#email)
    } else {
      throw new AuthError('Email is required to recover password')
    }
  }

  async createUser() {
    if (this.#email && this.#password) {
      // Create the basic auth user
      await this.auth.createUserWithEmailAndPassword(
        this.#email,
        this.#password,
      )
      this.#id = this.auth.currentUser.uid
      const downloadURL = await uploadUserAvatar(this.#photoURL, {
        userAuthUid: this.#id,
      })
      // Add some personal information to the auth user
      this.#photoURL = parseAvatar((downloadURL: any), { email: this.#email })
      await this.auth.currentUser.updateProfile({
        displayName: this.#displayName,
        photoURL: this.#photoURL,
      })
      // Create a user object to store extra user information
      const user = new User({
        displayName: this.#displayName,
        email: this.#email,
        phoneNumber: this.#phoneNumber
          ? `${this.#callingCode}${this.#phoneNumber}`
          : '',
        photoURL: this.#photoURL,
        userAuthUid: this.#id,
        location: ({
          country: this.#country,
        }: $FlowFixMe),
      })
      return await user.create()
    } else {
      throw new AuthError('Email and password are required to register')
    }
  }
}
