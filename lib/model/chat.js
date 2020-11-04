/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import type { BasicChat, ChatClass } from './types/chat'
import { DB_CHAT_COLLECTION } from 'utils/constants'

export class ChatError extends Error {
  constructor(...args: any) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ChatError)
    }

    this.name = 'ChatError'
  }
}

export default class Chat implements ChatClass {
  #id
  #active
  #lastMessage
  #littenSpecies
  #littenType
  #littenUid
  #participants
  #metadata
  #cursor = null
  #numOfItemsPerPage = 10

  constructor(basicChat: BasicChat) {
    this.mapDocToProps(basicChat)
  }

  get collection() {
    return firestore().collection(DB_CHAT_COLLECTION)
  }

  get id() {
    return this.#id
  }

  set lastMessage(lastMessage: string) {
    if (lastMessage) {
      this.#lastMessage = lastMessage
      this.updateOne('lastMessage', lastMessage)
    }
  }

  clearCursor() {
    this.#cursor = null
  }

  subscribeForUser(userUid?: string) {
    let userChats = this.collection.where(
      'participants',
      'array-contains',
      userUid,
    )
    userChats = userChats.limit(this.#numOfItemsPerPage)
    userChats = userChats.orderBy(
      new firestore.FieldPath('metadata', 'updatedAt'),
      'desc',
    )
    if (this.#cursor) {
      userChats = userChats.startAfter(this.#cursor)
    }
    return userChats
  }

  buildObject() {
    const chatObject = {
      active: this.#active,
      lastMessage: this.#lastMessage,
      littenSpecies: this.#littenSpecies,
      littenType: this.#littenType,
      littenUid: this.#littenUid,
      participants: this.#participants,
      metadata: {
        createdAt:
          this.#metadata.createdAt ?? firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    }
    return chatObject
  }

  toJSON() {
    const object = this.buildObject()
    object.metadata = {
      createdAt: {
        seconds: object.metadata.createdAt.seconds,
      },
      updatedAt: {
        seconds: object.metadata.updatedAt.seconds,
      },
    }
    return { id: this.#id, key: this.#id, ...object }
  }

  mapDocToProps({
    id = '',
    active = true,
    lastMessage = '',
    littenSpecies = '',
    littenType = '',
    littenUid = '',
    participants = [],
    metadata = {
      createdAt: null,
      updatedAt: null,
    },
  }: BasicChat) {
    this.#id = id
    this.#active = active
    this.#lastMessage = lastMessage
    this.#littenSpecies = littenSpecies
    this.#littenType = littenType
    this.#littenUid = littenUid
    this.#participants = participants
    this.#metadata = metadata
  }

  async create() {
    if (!this.#id) {
      const chatObject = this.buildObject()
      const chat = await this.collection.add(chatObject)
      this.#id = chat.id
    } else {
      throw new ChatError(`Chat already exists with id ${this.#id}`)
    }
  }

  async get(userUid?: string) {
    let chat

    if (this.#id) {
      chat = await this.collection.doc(this.#id).get()
    } else if (this.#littenUid && userUid) {
      const results = await this.collection
        .where('littenUid', '==', this.#littenUid)
        .where('participants', 'array-contains', userUid)
        .limit(1)
        .get()
      if (!results.empty) {
        chat = results.docs[0]
      }
    }

    if (chat) {
      this.mapDocToProps({ ...chat.data(), id: chat.id })
    }
  }

  async updateOne(field: string, value: any) {
    if (this.#id) {
      return await this.collection.doc(this.#id).update({
        [field]: value,
        'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
      })
    }
  }
}
