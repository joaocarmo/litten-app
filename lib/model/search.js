/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import { DB_LITTEN_COLLECTION, DB_USER_KEY_ID } from 'utils/constants'
import Auth from './auth'
import type { SearchSettings } from './types/search'

export default class Search {
  #filters = {
    numOfItemsPerPage: 10,
  }
  #user = null
  #cursor = null

  constructor({ filters = {}, user }: SearchSettings = {}) {
    this.#filters = { ...this.#filters, ...filters }
    this.#user = user ?? new Auth()
  }

  get collection() {
    return firestore().collection(DB_LITTEN_COLLECTION)
  }

  get homeFeed() {
    const active = this.collection.where('active', '==', true)
    const limited = active.limit(this.#filters.numOfItemsPerPage)
    const ordered = limited.orderBy(
      new firestore.FieldPath('metadata', 'createdAt'),
      'desc',
    )
    if (this.#cursor) {
      const paginated = ordered.startAfter(this.#cursor)
      return paginated
    }
    return ordered
  }

  clearCursor() {
    this.#cursor = null
  }

  async getHomeFeed() {
    const data = []
    const querySnapshot = await this.homeFeed.get()
    querySnapshot.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
        key: documentSnapshot.id,
      })
    })
    const latestCursor = querySnapshot.docs.pop()
    if (!latestCursor || latestCursor.id === this.#cursor?.id) {
      return []
    }
    this.#cursor = latestCursor
    return data
  }

  userPostsQuery(active: boolean = true) {
    return this.collection
      .where(DB_USER_KEY_ID, '==', this.#user?.userUid)
      .where('active', '==', active)
      .orderBy(new firestore.FieldPath('metadata', 'createdAt'), 'desc')
  }

  async userPosts(active: boolean = true) {
    const data = []
    const querySnapshot = await this.userPostsQuery(active).get()
    querySnapshot.forEach((documentSnapshot) => {
      data.push({
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
        key: documentSnapshot.id,
      })
    })
    return data
  }

  async userActivePosts() {
    return await this.userPosts()
  }

  async userInactivePosts() {
    return await this.userPosts(false)
  }
}
