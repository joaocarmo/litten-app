/* eslint-disable class-methods-use-this */
import firestore, { batchLoaderFactory, DataLoader } from '@db/firestore'
import Base from '@model/base'
import { ChatError } from '@model/error/chat'
import Message from '@model/message'
import type { BasicChat } from '@model/types/chat'
import {
  CHATS_INITIAL_NUM_TO_RENDER,
  DB_CHAT_COLLECTION,
} from '@utils/constants'
import { logError } from '@utils/dev'

export default class Chat extends Base {
  static #cursor = null

  static #numOfItemsPerPage = CHATS_INITIAL_NUM_TO_RENDER

  #lastMessage

  #lastMessageBy

  #littenSpecies

  #littenType

  #littenUid

  #participants

  #read

  private dataLoader: DataLoader<string, BasicChat>

  constructor(basicChat: Partial<BasicChat>) {
    super()

    this.mapDocToProps(basicChat)

    this.dataLoader = new DataLoader(Chat.loadAll, { cacheKeyFn: Chat.keyFn })
  }

  static get firestore(): any {
    return firestore
  }

  static get collection(): any {
    return Chat.firestore().collection(DB_CHAT_COLLECTION)
  }

  private static loadAll = batchLoaderFactory<BasicChat>(this.collection)

  private static keyFn = (id: string) => `${DB_CHAT_COLLECTION}/${id}`

  private getById(id: string) {
    return this.dataLoader.load(id)
  }

  static clearCursor() {
    this.#cursor = null
  }

  static queryForUser(userUid: string): any {
    return this.collection.where('participants', 'array-contains', userUid)
  }

  static subscribeForUser(userUid: string): any {
    let userChats = this.queryForUser(userUid)
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

  static async getPreviousChats(userUid: string, lastChat: any): Promise<any> {
    if (lastChat) {
      this.#cursor = lastChat
    }

    return this.subscribeForUser(userUid).get()
  }

  static async getLastUnreadChats(
    userUid: string,
    lastCheckAt: Date,
  ): Promise<number> {
    let unreadChats = this.queryForUser(userUid)
    unreadChats = unreadChats.where(
      new firestore.FieldPath('metadata', 'updatedAt'),
      '>=',
      lastCheckAt,
    )
    const results = await unreadChats.get()
    const unreadDocs = []
    results.forEach((documentSnapshot) => {
      const read = documentSnapshot.get('read')

      if (!read.includes(userUid)) {
        unreadDocs.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        })
      }
    })
    return unreadDocs.length
  }

  get firestore(): any {
    return Chat.firestore
  }

  get collection(): any {
    return Chat.collection
  }

  get lastMessage(): string {
    return this.#lastMessage || ''
  }

  get lastMessageBy(): string {
    return this.#lastMessageBy || ''
  }

  get littenSpecies(): string {
    return this.#littenSpecies || ''
  }

  get littenType(): string {
    return this.#littenType || ''
  }

  get littenUid(): string {
    return this.#littenUid || ''
  }

  get participants(): string[] {
    return this.#participants
  }

  get read(): string[] {
    return this.#read
  }

  buildObject(): Omit<BasicChat, 'id'> {
    const chatObject = {
      lastMessage: this.#lastMessage,
      lastMessageBy: this.#lastMessageBy,
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
    lastMessageBy = '',
    littenSpecies = '',
    littenType = '',
    littenUid = '',
    participants = [],
    read = [],
    ...otherProps
  }: Partial<BasicChat>) {
    super.mapCommonProps(otherProps)
    this.#lastMessage = lastMessage
    this.#lastMessageBy = lastMessageBy
    this.#littenSpecies = littenSpecies
    this.#littenType = littenType
    this.#littenUid = littenUid
    this.#participants = participants
    this.#read = read
  }

  async create(): Promise<any> {
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
        // eslint-disable-next-line prefer-destructuring
        chat = results.docs[0]
      }
    }

    if (chat) {
      this.mapDocToProps({ ...chat.data(), id: chat?.id })
    }
  }

  readBy(userUid: string): boolean {
    return this.#read.includes(userUid)
  }

  async setReadBy(userUid: string): Promise<void> {
    await this.get()

    if (!this.readBy(userUid)) {
      this.#read = [...this.#read, userUid]
    }

    return this.updateOne('read', this.#read, false)
  }

  async setLastMessage({
    lastMessage,
    lastMessageBy,
  }: {
    lastMessage: string
    lastMessageBy: string
  }): Promise<void> {
    if (lastMessage) {
      this.#lastMessage = lastMessage
      this.#lastMessageBy = lastMessageBy
      this.#read = [lastMessageBy]
      const updateObject = {
        lastMessage,
        lastMessageBy,
        read: [lastMessageBy],
      }
      return this.update(updateObject)
    }
  }

  async update(
    updateObject: Record<string, unknown>,
    updateTimestamp = true,
  ): Promise<void> {
    if (this.id) {
      let newUpdateObject = updateObject

      if (updateTimestamp) {
        newUpdateObject = {
          ...updateObject,
          'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
        }
      }

      return this.collection.doc(this.id).update(newUpdateObject)
    }
  }

  async updateOne(
    field: string,
    value: any,
    updateTimestamp = true,
  ): Promise<void> {
    const updateObject = {
      [field]: value,
    }
    return this.update(updateObject, updateTimestamp)
  }

  async deleteForUser(userUid: string): Promise<void> {
    if (this.#participants.length > 1) {
      const participants: string[] = this.#participants.filter(
        (id) => id !== userUid,
      )
      this.#participants = participants
      return this.updateOne('participants', this.#participants)
    } else {
      return this.delete()
    }
  }

  async delete() {
    if (this.id) {
      const message = new Message({
        chatUid: this.id,
      })

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
