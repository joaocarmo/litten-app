/* eslint-disable class-methods-use-this */
import { USE_GRAVATAR } from '@utils/env'
import Services from '@services/services'
import { AuthError } from '@model/error/auth'
import { parseAvatar } from '@utils/functions'
import { uploadUserAvatar } from '@db/storage'
import { actionCodeSettings } from '@config/auth'
import type { AuthSettings } from '@model/types/auth'

export default class Auth extends Services {
  #id: string

  #photoURL: string

  #callingCode: string

  #country: string

  #displayName: string

  #email: string

  #password: string

  #phoneNumber: string

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
    super()

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

  static signOut() {
    return this.auth.signOut()
  }

  get signOut() {
    return Auth.signOut
  }

  get currentUser() {
    return this.auth.currentUser
  }

  get id(): string {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get displayName(): string {
    return this.#displayName
  }

  set displayName(displayName: string) {
    this.#displayName = displayName
    this.updateOne('displayName', this.#displayName)
  }

  get phoneNumber(): string {
    return this.#phoneNumber ? `${this.#callingCode}${this.#phoneNumber}` : ''
  }

  get country(): string {
    return this.#country
  }

  get photoURL(): string {
    return this.#photoURL
  }

  set photoURL(photoURL: string) {
    if (photoURL) {
      this.uploadAndSetPhoto(photoURL)
    } else {
      this.#photoURL = photoURL
      this.updateOne('photoURL', this.#photoURL)
    }
  }

  get email(): string {
    return this.#email
  }

  set email(email: string) {
    this.#email = email
    this.currentUser.updateEmail(email)
  }

  get emailVerified(): boolean {
    if (this.currentUser) {
      return this.currentUser.emailVerified
    }

    return false
  }

  async uploadAndSetPhoto(photoURL: string): Promise<string> {
    const downloadURL = await uploadUserAvatar(photoURL, {
      userAuthUid: this.#id,
    })
    this.#photoURL = parseAvatar(downloadURL, {
      email: this.#email,
    })
    this.updateOne('photoURL', this.#photoURL)
    return this.#photoURL
  }

  async updateOne(field: string, value: string): Promise<void> {
    if (this.currentUser) {
      return this.currentUser.updateProfile({
        [field]: value,
      })
    }
  }

  async signIn() {
    if (this.#email && this.#password) {
      await this.auth.signInWithEmailAndPassword(this.#email, this.#password)
      this.#id = this.currentUser.uid
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

  async checkActionCode(actionCode: string) {
    return this.auth.checkActionCode(actionCode)
  }

  async applyActionCode(actionCode: string) {
    return this.auth.applyActionCode(actionCode)
  }

  async sendEmailVerification() {
    if (this.currentUser) {
      await this.currentUser.sendEmailVerification(actionCodeSettings)
    }
  }

  async create() {
    if (this.#email && this.#password) {
      // Create the basic auth user
      await this.auth.createUserWithEmailAndPassword(
        this.#email,
        this.#password,
      )
      this.#id = this.currentUser.uid
      // Update the Auth user info
      this.displayName = this.#displayName

      if (this.#photoURL || USE_GRAVATAR) {
        this.#photoURL = await this.uploadAndSetPhoto(this.#photoURL)
      }
    } else {
      throw new AuthError('Email and password are required to register')
    }
  }

  async delete(): Promise<void> {
    return this.currentUser.delete()
  }
}
