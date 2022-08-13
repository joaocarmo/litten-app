import firestore, { batchLoaderFactory, DataLoader } from '@db/firestore'
import Base from '@model/base'
import { MessageError } from '@model/error/message'
import { debugLog } from '@utils/dev'
import type { BasicMessage } from '@model/types/message'
import {
  DB_MESSAGE_COLLECTION,
  DB_MESSAGE_BATCH_AMOUNT,
} from '@utils/constants'

export default class Message extends Base<BasicMessage> {
  static COLLECTION_NAME = DB_MESSAGE_COLLECTION

  private dataLoader: DataLoader<string, BasicMessage>

  #cursor = null

  #numOfItemsPerPage = DB_MESSAGE_BATCH_AMOUNT

  #chatUid: string

  #text: string

  #userUid: string

  constructor(basicMessage: Partial<BasicMessage>) {
    super()

    this.mapDocToProps(basicMessage)

    this.dataLoader = new DataLoader(Message.loadAll, {
      cacheKeyFn: Message.keyFn,
    })
  }

  private static loadAll = batchLoaderFactory<BasicMessage>(this.collection)

  private static keyFn = (id: string) => `${Message.COLLECTION_NAME}/${id}`

  private getById(id: string) {
    return this.dataLoader.load(id)
  }

  get chatUid(): string {
    return this.#chatUid
  }

  set chatUid(chatUid: string) {
    this.#chatUid = chatUid
  }

  get text(): string {
    return this.#text
  }

  set text(text: string) {
    this.#text = text
  }

  get userUid(): string {
    return this.#userUid
  }

  set userUid(userUid: string) {
    this.#userUid = userUid
  }

  buildObject(): Omit<BasicMessage, 'id'> {
    return {
      chatUid: this.#chatUid,
      text: this.#text,
      userUid: this.#userUid,
      metadata: this.buildMetadata(),
    }
  }

  mapDocToProps({
    chatUid = '',
    text = '',
    userUid = '',
    ...otherProps
  }: Partial<BasicMessage>) {
    super.mapCommonProps(otherProps)
    this.#chatUid = chatUid
    this.#text = text
    this.#userUid = userUid
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

  async get(): Promise<BasicMessage | undefined> {
    const message = await this.getById(this.id)

    if (!message) {
      throw new MessageError('Needs a message uid to get')
    }

    this.mapDocToProps(message)

    return this.toJSON()
  }

  async getAll() {
    if (this.#chatUid) {
      return this.collection.where('chatUid', '==', this.#chatUid).get()
    } else {
      throw new MessageError('Needs a chat uid to get all')
    }
  }

  async getPreviousMessages(lastMessage: any) {
    if (lastMessage) {
      this.#cursor = lastMessage
    }

    return this.subscribeToChat().get()
  }

  async append() {
    if (!this.id && this.#chatUid && this.#text && this.#userUid) {
      const messageObject = this.buildObject()

      return this.collection.add(messageObject)
    } else {
      throw new MessageError(
        'Message does not meet all the requirements for creation',
      )
    }
  }

  async create(): Promise<BasicMessage> {
    const message = await this.append()

    this.id = message.id

    return this.toJSON()
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
