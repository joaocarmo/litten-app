/**
 * @format
 * @flow
 */

import type { UserClass } from './types/user'

export type BasicUser = {
  displayName: string,
  photoURL: string | { uri: string },
}

export default class User implements UserClass {
  #displayName = null
  #photoURL = null

  constructor({ displayName, photoURL }: BasicUser = {}) {
    this.#displayName = displayName
    this.#photoURL = typeof photoURL === 'string' ? photoURL : photoURL?.uri
  }

  get displayName() {
    return this.#displayName
  }

  get photoURL() {
    return this.#photoURL
  }
}
