/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import type { BasicMessage, MessageClass } from './types/message'
import { DB_MESSAGE_COLLECTION } from 'utils/constants'

export class MessageError extends Error {
  constructor(...args: any) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MessageError)
    }

    this.name = 'MessageError'
  }
}

export default class Message implements MessageClass {
  #cursor = null
  #numOfItemsPerPage = 20
  #id
  #chatUid
  #text
  #userUid
  #metadata

  constructor(basicMessage: BasicMessage) {
    this.mapDocToProps(basicMessage)
  }

  get collection() {
    return firestore().collection(DB_MESSAGE_COLLECTION)
  }

  get id() {
    return this.#id
  }

  get chatUid() {
    return this.#chatUid
  }

  get text() {
    return this.#text
  }

  get userUid() {
    return this.#userUid
  }

  get metadata() {
    return this.#metadata
  }

  set chatUid(chatUid: string) {
    this.#chatUid = chatUid
  }

  set text(text: string) {
    this.#text = text
  }

  set userUid(userUid: string) {
    this.#userUid = userUid
  }

  buildObject() {
    const messageObject = {
      chatUid: this.#chatUid,
      text: this.#text,
      userUid: this.#userUid,
      metadata: {
        createdAt:
          this.#metadata.createdAt ?? firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
    }
    return messageObject
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
    chatUid = '',
    text = '',
    userUid = '',
    metadata = {
      createdAt: null,
      updatedAt: null,
    },
  }: BasicMessage) {
    this.#id = id
    this.#chatUid = chatUid
    this.#text = text
    this.#userUid = userUid
    this.#metadata = metadata
  }

  subscribeToChat() {
    let chatMessages = this.collection.where('chatUid', '==', this.#chatUid)
    chatMessages = chatMessages.limit(this.#numOfItemsPerPage)
    chatMessages = chatMessages.orderBy(
      new firestore.FieldPath('metadata', 'createdAt'),
      'desc',
    )
    if (this.#cursor) {
      chatMessages = chatMessages.startAfter(this.#cursor)
    }
    return chatMessages
  }

  async create() {
    if (!this.#id && this.#chatUid && this.#text && this.#userUid) {
      const messageObject = this.buildObject()
      const message = await this.collection.add(messageObject)
      this.#id = message.id
    } else {
      throw new MessageError(
        'Message does not meet all the requirements for creation',
      )
    }
  }

  async append() {
    if (!this.#id && this.#chatUid && this.#text && this.#userUid) {
      const messageObject = this.buildObject()
      await this.collection.add(messageObject)
    } else {
      throw new MessageError(
        'Message does not meet all the requirements for creation',
      )
    }
  }
}
