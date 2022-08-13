/* eslint-disable class-methods-use-this */
import firestore from '@db/firestore'
import storage from '@db/storage'

export default abstract class Services {
  static COLLECTION_NAME = ''

  COLLECTION_NAME: string

  constructor() {
    this.COLLECTION_NAME = (this.constructor as typeof Services).COLLECTION_NAME
  }

  static get firestore() {
    return firestore
  }

  static get collection() {
    return Services.firestore().collection(this.COLLECTION_NAME)
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
