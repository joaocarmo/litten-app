/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import Base from 'model/base'
import Message from 'model/message'
import type { BasicChat, ChatClass } from 'model/types/chat'
import { debugLog } from 'utils/dev'
import { DB_CHAT_COLLECTION } from 'utils/constants'

export class ChatError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ChatError)
    }

    this.name = 'ChatError'
  }
}

export default class Chat extends Base implements ChatClass {
  static #cursor = null
  static #numOfItemsPerPage = 10
  #lastMessage
  #littenSpecies
  #littenType
  #littenUid
  #participants

  constructor(basicChat: BasicChat) {
    super()

    this.mapDocToProps(basicChat)
  }

  static get collection() {
    return firestore().collection(DB_CHAT_COLLECTION)
  }

  static clearCursor() {
    this.#cursor = null
  }

  static subscribeForUser(userUid?: string) {
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

  get collection() {
    return firestore().collection(DB_CHAT_COLLECTION)
  }

  set lastMessage(lastMessage: string) {
    if (lastMessage) {
      this.#lastMessage = lastMessage
      this.updateOne('lastMessage', lastMessage)
    }
  }

  buildObject() {
    const chatObject = {
      lastMessage: this.#lastMessage,
      littenSpecies: this.#littenSpecies,
      littenType: this.#littenType,
      littenUid: this.#littenUid,
      participants: this.#participants,
      metadata: this.buildMetadata(),
    }
    return chatObject
  }

  mapDocToProps({
    lastMessage = '',
    littenSpecies = '',
    littenType = '',
    littenUid = '',
    participants = [],
    ...otherProps
  }: BasicChat) {
    super.mapCommonProps(otherProps)

    this.#lastMessage = lastMessage
    this.#littenSpecies = littenSpecies
    this.#littenType = littenType
    this.#littenUid = littenUid
    this.#participants = participants
  }

  async create() {
    if (!this.id) {
      const chatObject = this.buildObject()
      const chat = await this.collection.add(chatObject)
      this.id = chat.id
    } else {
      throw new ChatError(`Chat already exists with id ${this.id}`)
    }
  }

  async get(userUid?: string) {
    let chat

    if (this.id) {
      chat = await this.collection.doc(this.id).get()
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
    if (this.id) {
      return await this.collection.doc(this.id).update({
        [field]: value,
        'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
      })
    }
  }

  async deleteForUser(userUid: string) {
    if (this.#participants.length > 1) {
      const participants: string[] = this.#participants.filter(
        (id) => id !== userUid,
      )
      this.#participants = participants
      return await this.updateOne('participants', this.#participants)
    } else {
      return await this.delete()
    }
  }

  async delete() {
    if (this.id) {
      const message = new Message({ chatUid: this.id })
      try {
        await message.deleteAll()
        await this.collection.doc(this.id).delete()
      } catch (err) {
        debugLog(err)
        throw new ChatError('Could not delete the chat and all its messages')
      }
    } else {
      throw new ChatError('Needs a chat uid to delete')
    }
  }
}
