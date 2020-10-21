/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import { DB_LITTEN_COLLECTION } from 'utils/constants'
import Auth from './auth'
import type { SearchSettings } from './types/search'

export default class Search {
  #filters = null
  #user = null

  constructor({ filters, user }: SearchSettings = {}) {
    this.#filters = filters
    this.#user = user ?? new Auth()
  }

  homeFeed() {
    const db = firestore()
    const collection = db.collection(DB_LITTEN_COLLECTION)
    const active = collection.where('active', '==', true)
    const ordered = active.orderBy(
      new firestore.FieldPath('metadata', 'createdAt'),
      'desc',
    )
    return ordered
  }

  async userPosts(active: boolean = true) {
    return await firestore()
      .collection(DB_LITTEN_COLLECTION)
      .where(
        new firestore.FieldPath('user', 'userUid'),
        '==',
        this.#user?.userUid,
      )
      .where('active', '==', active)
      .orderBy(new firestore.FieldPath('metadata', 'createdAt'), 'desc')
      .get()
  }

  async userActivePosts() {
    return await this.userPosts()
  }

  async userInactivePosts() {
    return await this.userPosts(false)
  }
}
