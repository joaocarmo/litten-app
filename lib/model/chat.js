/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import Base from 'model/base'
import Message from 'model/message'
import type { BasicChat, ChatClass } from 'model/types/chat'
import {
  CHATS_INITIAL_NUM_TO_RENDER,
  DB_CHAT_COLLECTION,
} from 'utils/constants'
import { logError } from 'utils/dev'

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
  static #numOfItemsPerPage = CHATS_INITIAL_NUM_TO_RENDER
  #lastMessage
  #littenSpecies
  #littenType
  #littenUid
  #participants
  #read

  constructor(basicChat: BasicChat) {
    super()

    this.mapDocToProps(basicChat)
  }

  static get firestore() {
    return firestore
  }

  static get collection() {
    return this.firestore().collection(DB_CHAT_COLLECTION)
  }

  static clearCursor() {
    this.#cursor = null
  }

  static subscribeForUser(userUid: string) {
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

  static async getPreviousChats(userUid: string, lastChat: any) {
    if (lastChat) {
      this.#cursor = lastChat
    }
    return await this.subscribeForUser(userUid).get()
  }

  get firestore() {
    return firestore
  }

  get collection() {
    return this.firestore().collection(DB_CHAT_COLLECTION)
  }

  get lastMessage() {
    return this.#lastMessage
  }

  get littenSpecies() {
    return this.#littenSpecies
  }

  get littenType() {
    return this.#littenType
  }

  get littenUid() {
    return this.#littenUid
  }

  get participants() {
    return this.#participants
  }

  set lastMessage(lastMessage: string) {
    if (lastMessage) {
      this.#lastMessage = lastMessage
      this.#read = []
      this.updateOne('lastMessage', lastMessage)
      this.updateOne('read', [], false)
    }
  }

  set read(userUid: string) {
    const readByParticipants = [...(this.#read || [])]
    if (!readByParticipants.includes(userUid)) {
      readByParticipants.push(userUid)
      this.#read = readByParticipants
      this.updateOne('read', readByParticipants, false)
    }
  }

  buildObject(): BasicChat {
    const chatObject = {
      lastMessage: this.#lastMessage,
      littenSpecies: this.#littenSpecies,
      littenType: this.#littenType,
      littenUid: this.#littenUid,
      participants: this.#participants,
      read: this.#read,
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
    read = [],
    ...otherProps
  }: BasicChat) {
    super.mapCommonProps(otherProps)

    this.#lastMessage = lastMessage
    this.#littenSpecies = littenSpecies
    this.#littenType = littenType
    this.#littenUid = littenUid
    this.#participants = participants
    this.#read = read
  }

  async create() {
    if (!this.id) {
      const chatObject = this.buildObject()
      const chat = await this.collection.add(chatObject)
      this.id = chat.id

      return chat
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

  readBy(userUid: string) {
    return this.#read.includes(userUid)
  }

  async updateOne(field: string, value: any, updateTimestamp: boolean = true) {
    if (this.id) {
      let updateObject = {
        [field]: value,
      }

      if (updateTimestamp) {
        updateObject = {
          ...updateObject,
          'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
        }
      }

      return await this.collection.doc(this.id).update(updateObject)
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
        logError(err)
        throw new ChatError('Could not delete the chat and all its messages')
      }
    } else {
      throw new ChatError('Needs a chat uid to delete')
    }
  }
}
