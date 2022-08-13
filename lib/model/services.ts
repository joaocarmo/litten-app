/* eslint-disable class-methods-use-this */
import auth from '@db/auth'
import firestore from '@db/firestore'
import storage from '@db/storage'

export default abstract class Services {
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

  get auth() {
    return auth()
  }

  get firestore() {
    return firestore
  }

  get collection() {
    return this.firestore().collection(this.COLLECTION_NAME)
  }

  static get storage() {
    return storage
  }

  get storage() {
    return storage
  }

  get storagePath(): string {
    return ''
  }

  storageRef() {
    if (!this.storagePath) {
      throw new Error(
        "Storage ref not found, please implement a 'get storagePath()' method",
      )
    }

    return this.storage().ref(this.storagePath)
  }
}
