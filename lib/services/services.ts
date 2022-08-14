import auth from '@db/auth'
import firestore from '@db/firestore'
import storage from '@db/storage'
import { ServiceError } from '@services/error'
import type { BaseRecord } from '@db/firestore'

export interface UpdateOptions {
  updateTimestamp?: boolean
}

export default abstract class Services<T extends BaseRecord = BaseRecord> {
  static AUTH_PROVIDER = auth.EmailAuthProvider

  static COLLECTION_NAME = ''

  AUTH_PROVIDER: typeof auth.EmailAuthProvider

  COLLECTION_NAME: string

  constructor() {
    this.AUTH_PROVIDER = (this.constructor as typeof Services).AUTH_PROVIDER
    this.COLLECTION_NAME = (this.constructor as typeof Services).COLLECTION_NAME
  }

  static get firestore() {
    return firestore
  }

  static get collection() {
    return Services.firestore().collection(this.COLLECTION_NAME)
  }

  static get auth() {
    return auth()
  }

  // eslint-disable-next-line class-methods-use-this
  get auth() {
    return auth()
  }

  // eslint-disable-next-line class-methods-use-this
  get firestore() {
    return firestore
  }

  get collection() {
    return this.firestore().collection(this.COLLECTION_NAME)
  }

  static get storage() {
    return storage
  }

  // eslint-disable-next-line class-methods-use-this
  get storage() {
    return storage
  }

  // eslint-disable-next-line class-methods-use-this
  get storagePath(): string {
    return ''
  }

  storageRef() {
    if (!this.storagePath) {
      throw new ServiceError(
        "Storage ref not found, please implement a 'get storagePath()' method",
      )
    }

    return this.storage().ref(this.storagePath)
  }

  // eslint-disable-next-line class-methods-use-this
  updateMetadata(data: Partial<T>, options?: UpdateOptions) {
    const { updateTimestamp = true } = options || {}

    if (updateTimestamp) {
      return {
        ...data,
        'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
      }
    }

    return data
  }
}
