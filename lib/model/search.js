/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import { DB_LITTEN_COLLECTION, DB_USER_KEY_ID } from 'utils/constants'
import type { SearchSettings } from './types/search'

export default class Search {
  #filters = {
    numOfItemsPerPage: 10,
  }
  #user = null
  #cursor = null

  constructor({ filters = {}, user }: SearchSettings = {}) {
    this.#filters = { ...this.#filters, ...filters }
    this.#user = user
  }

  get collection() {
    return firestore().collection(DB_LITTEN_COLLECTION)
  }

  get homeFeed() {
    let feed
    feed = this.collection.where('active', '==', true)
    feed = feed.limit(this.#filters.numOfItemsPerPage)
    feed = feed.orderBy(
      new firestore.FieldPath('metadata', 'createdAt'),
      'desc',
    )
    if (this.#cursor) {
      feed = feed.startAfter(this.#cursor)
    }
    return feed
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
      .where(DB_USER_KEY_ID, '==', this.#user?.id)
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
