/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import Base from 'model/base'
import { debugLog } from 'utils/dev'
import type { BasicMessage, MessageClass } from 'model/types/message'
import { DB_MESSAGE_COLLECTION, DB_MESSAGE_BATCH_AMOUNT } from 'utils/constants'

export class MessageError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MessageError)
    }

    this.name = 'MessageError'
  }
}

export default class Message extends Base implements MessageClass {
  #cursor = null
  #numOfItemsPerPage = DB_MESSAGE_BATCH_AMOUNT
  #chatUid
  #text
  #userUid

  constructor(basicMessage: BasicMessage) {
    super()

    this.mapDocToProps(basicMessage)
  }

  static get firestore(): any {
    return firestore
  }

  static get collection(): any {
    return Message.firestore().collection(DB_MESSAGE_COLLECTION)
  }

  get firestore(): any {
    return Message.firestore
  }

  get collection(): any {
    return Message.collection
  }

  get chatUid(): string {
    return this.#chatUid
  }

  get text(): string {
    return this.#text
  }

  get userUid(): string {
    return this.#userUid
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

  buildObject(): BasicMessage {
    const messageObject = {
      chatUid: this.#chatUid,
      text: this.#text,
      userUid: this.#userUid,
      metadata: this.buildMetadata(),
    }
    return messageObject
  }

  mapDocToProps({
    chatUid = '',
    text = '',
    userUid = '',
    ...otherProps
  }: BasicMessage) {
    super.mapCommonProps(otherProps)

    this.#chatUid = chatUid
    this.#text = text
    this.#userUid = userUid
  }

  subscribeToChat(): any {
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

  async get(): Promise<any> {
    if (this.id) {
      const message = await this.collection.doc(this.id).get()

      if (message) {
        this.mapDocToProps({ ...message.data(), id: message.id })
      }
    } else {
      throw new MessageError('Needs a message uid to get')
    }
  }

  async getAll(): any {
    if (this.#chatUid) {
      return await this.collection.where('chatUid', '==', this.#chatUid).get()
    } else {
      throw new MessageError('Needs a chat uid to get all')
    }
  }

  async getPreviousMessages(lastMessage: any): Promise<any> {
    if (lastMessage) {
      this.#cursor = lastMessage
    }
    return await this.subscribeToChat().get()
  }

  async append(): Promise<BasicMessage> {
    if (!this.id && this.#chatUid && this.#text && this.#userUid) {
      const messageObject = this.buildObject()
      return await this.collection.add(messageObject)
    } else {
      throw new MessageError(
        'Message does not meet all the requirements for creation',
      )
    }
  }

  async create(): Promise<BasicMessage> {
    const message = await this.append()
    this.id = message.id

    return message
  }

  async delete() {
    if (this.id) {
      await this.collection.doc(this.id).delete()
    } else {
      throw new MessageError('Needs a message uid to delete')
    }
  }

  async deleteAll() {
    if (this.#chatUid) {
      const messagesQuerySnapshot = await this.getAll()
      const batch = firestore().batch()
      messagesQuerySnapshot.forEach((documentSnapshot) => {
        batch.delete(documentSnapshot.ref)
      })

      await batch.commit()

      debugLog('[MESSAGE] DELETED MESSAGES', messagesQuerySnapshot.size)
    } else {
      throw new MessageError('Needs a chat uid to delete all')
    }
  }
}
