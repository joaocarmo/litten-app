/**
 * @format
 * @flow
 */

import { WEB_APP_BASE } from '@env'
import auth from 'db/auth'
import User from 'model/user'
import { parseAvatar } from 'utils/functions'
import { uploadUserAvatar } from 'db/storage'
import { locationSchema } from 'db/schemas/location'
import type { AuthClass, AuthSettings } from 'model/types/auth'

export class AuthError extends Error {
  constructor(...args: string[]) {
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
  }: AuthSettings) {
    const user = this.currentUser
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

  get displayName() {
    return this.#displayName
  }

  get photoURL() {
    return this.#photoURL
  }

  get email() {
    return this.#email
  }

  get emailVerified() {
    if (this.currentUser) {
      return this.currentUser.emailVerified
    }

    return false
  }

  set id(id: string) {
    this.#id = id
  }

  set displayName(displayName: string) {
    this.#displayName = displayName
    this.updateOne('displayName', this.#displayName)
  }

  set photoURL(photoURL: string | void = '') {
    if (photoURL) {
      this.uploadAndSetPhoto(photoURL)
    } else {
      this.#photoURL = photoURL
      this.updateOne('photoURL', this.#photoURL)
    }
  }

  set email(email: string) {
    this.#email = email
    this.currentUser.updateEmail(email)
  }

  async uploadAndSetPhoto(photoURL: string) {
    const downloadURL = await uploadUserAvatar(photoURL, {
      userAuthUid: this.#id,
    })
    this.#photoURL = parseAvatar(downloadURL, { email: this.#email })
    this.updateOne('photoURL', this.#photoURL)
    return this.#photoURL
  }

  async updateOne(field: string, value: any) {
    if (this.currentUser) {
      return await this.currentUser.updateProfile({
        [field]: value,
      })
    }
  }

  async signIn() {
    if (this.#email && this.#password) {
      await this.auth.signInWithEmailAndPassword(this.#email, this.#password)
      this.#id = this.currentUser.uid
      const user = new User({ userAuthUid: this.#id })
      await user.get()
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

  async sendEmailVerification() {
    if (this.currentUser) {
      await this.currentUser.sendEmailVerification({
        url: `${WEB_APP_BASE}/open/verification`,
      })
    }
  }

  async createUser() {
    if (this.#email && this.#password) {
      // Create the basic auth user
      await this.auth.createUserWithEmailAndPassword(
        this.#email,
        this.#password,
      )
      this.#id = this.currentUser.uid
      // Update the Auth user info
      this.displayName = this.#displayName
      if (this.#photoURL) {
        this.#photoURL = await this.uploadAndSetPhoto(this.#photoURL)
      }
      // Create a user object to store extra user information
      const user = new User({
        displayName: this.#displayName,
        email: this.#email,
        phoneNumber: this.#phoneNumber
          ? `${this.#callingCode}${this.#phoneNumber}`
          : '',
        photoURL: this.#photoURL,
        userAuthUid: this.#id,
        location: {
          ...locationSchema,
          country: this.#country,
        },
      })
      return await user.create()
    } else {
      throw new AuthError('Email and password are required to register')
    }
  }
}
