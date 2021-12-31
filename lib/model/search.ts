import firestore from 'db/firestore'
import { string2tags } from 'utils/functions'
import {
  DB_LITTEN_COLLECTION,
  SEARCH_INITIAL_NUM_TO_RENDER,
} from 'utils/constants'
import type { BasicLitten } from 'model/types/litten'
import type { SearchSettings } from 'model/types/search'
export default class Search {
  #query
  #filters
  #minQueryLength = 2
  #numOfItemsPerPage = SEARCH_INITIAL_NUM_TO_RENDER
  #user = null
  #cursor = null

  constructor({ query = '', filters = {}, user }: SearchSettings = {}) {
    this.#query = query
    this.#filters = filters
    this.#user = user
  }

  get firestore(): any {
    return firestore
  }

  get collection(): any {
    return this.firestore().collection(DB_LITTEN_COLLECTION)
  }

  get query(): any {
    if (this.#query.length > this.#minQueryLength) {
      return this.#query
    }

    return ''
  }

  get queryArray(): string[] {
    return string2tags(this.query).slice(0, 10)
  }

  get homeFeed(): any {
    let feed
    feed = this.collection.where('active', '==', true)
    feed = feed.limit(this.#numOfItemsPerPage)
    feed = feed.orderBy(
      new firestore.FieldPath('metadata', 'createdAt'),
      'desc',
    )

    if (this.#cursor) {
      feed = feed.startAfter(this.#cursor)
    }

    if (this.query) {
      feed = feed.where('tags', 'array-contains-any', this.queryArray)
    }

    return feed
  }

  set query(query: string) {
    this.#query = query
  }

  startAfter(doc: any) {
    this.#cursor = doc
  }

  clearCursor() {
    this.#cursor = null
  }

  async getHomeFeed(): Promise<BasicLitten[]> {
    const data = []
    const querySnapshot = await this.homeFeed.get()

    if (!querySnapshot.empty) {
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
    }

    return data
  }

  userPostsQuery(active = true): any {
    return this.collection
      .where('userUid', '==', this.#user?.id)
      .where('active', '==', active)
      .orderBy(new firestore.FieldPath('metadata', 'createdAt'), 'desc')
  }

  async userPosts(active = true): Promise<BasicLitten[]> {
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

  async userActivePosts(): Promise<BasicLitten[]> {
    return this.userPosts()
  }

  async userInactivePosts(): Promise<BasicLitten[]> {
    return this.userPosts(false)
  }
}
