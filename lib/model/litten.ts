/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { APP_IS_DEV } from '@utils/env'
import storage from '@react-native-firebase/storage'
import firestore from '@db/firestore'
import Base from '@model/base'
import type { BasicLitten, LittenClass } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { PhotoObject } from '@store/types'
import { string2tags } from '@utils/functions'
import { logError } from '@utils/dev'
import { DB_LITTEN_COLLECTION, STORAGE_LITTEN_PHOTOS } from '@utils/constants'

export class LittenError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LittenError)
    }

    this.name = 'LittenError'
  }
}

export default class Litten extends Base implements LittenClass {
  #active

  #photos

  #species

  #story

  #title

  #type

  #user

  #userUid

  #tags

  constructor({ user = null, ...basicLitten }: BasicLitten) {
    super()
    this.mapDocToProps(basicLitten)
    this.#user = user
    this.#userUid = this.#userUid || this.#user?.id
  }

  static get firestore(): any {
    return firestore
  }

  static get collection(): any {
    return Litten.firestore().collection(DB_LITTEN_COLLECTION)
  }

  static get storage(): any {
    return storage
  }

  get firestore(): any {
    return Litten.firestore
  }

  get collection(): any {
    return Litten.collection
  }

  get storage(): any {
    return Litten.storage
  }

  get storageRef(): string {
    if (this.id) {
      return `${STORAGE_LITTEN_PHOTOS}/${this.id}`
    }

    return ''
  }

  get active(): (boolean & (void | boolean)) | boolean {
    return this.#active
  }

  set active(active = true) {
    this.#active = active
  }

  get photos(): Array<PhotoObject> {
    return this.#photos ?? []
  }

  set photos(photos: PhotoObject[] = []) {
    this.#photos = photos
  }

  get mainPhoto(): PhotoObject {
    return this.photos[0]
  }

  get species(): (string & (void | string)) | string {
    return this.#species
  }

  set species(species = '') {
    this.#species = species
  }

  get story(): (string & (void | string)) | string {
    return this.#story
  }

  set story(story = '') {
    this.#story = story
  }

  get title(): string {
    return this.#title
  }

  set title(title = '') {
    this.#title = title
  }

  get type(): string {
    return this.#type
  }

  set type(type = '') {
    this.#type = type
  }

  get userUid(): void | string {
    return this.#userUid
  }

  set userUid(userUid = '') {
    this.#userUid = userUid
  }

  get user(): BasicUser | null {
    return this.#user
  }

  set user(user: BasicUser | null = {}) {
    this.#user = user
  }

  get contactPreferences(): string[] {
    return this.#user?.contactPreferences || []
  }

  get tags(): string[] {
    return this.#tags
  }

  set tags(tags: string | string[] = []) {
    if (typeof tags === 'string') {
      this.#tags = [...new Set([...this.#tags, tags])]
    }

    if (Array.isArray(tags)) {
      this.#tags = [...new Set(tags)]
    }
  }

  buildTagsFromAttributes(): string[] {
    let tags = [...this.#tags]

    if (this.#title) {
      tags = [...tags, ...string2tags(this.#title)]
    }

    return [...new Set(tags)]
  }

  buildObject(): BasicLitten {
    const littenObject = {
      active: this.#active,
      location: this.buildLocation(),
      photos: this.#photos,
      species: this.#species,
      story: this.#story,
      title: this.#title,
      type: this.#type,
      userUid: this.#userUid,
      tags: this.#tags,
      metadata: this.buildMetadata(),
    }
    return littenObject
  }

  mapDocToProps({
    active = true,
    photos = [],
    species = '',
    story = '',
    title = '',
    type = '',
    userUid = '',
    tags = [],
    ...otherProps
  }: BasicLitten): void {
    super.mapCommonProps(otherProps)
    this.#active = active
    this.#photos = photos
    this.#species = species
    this.#story = story
    this.#title = title
    this.#type = type
    this.#userUid = userUid
    this.#tags = tags
  }

  async get(): Promise<void> {
    if (this.id) {
      const litten = await this.collection.doc(this.id).get()

      if (litten) {
        this.mapDocToProps({ ...litten.data(), id: litten.id })
      }
    }
  }

  async savePhoto(fileURI: string, docId: string): Promise<void | string> {
    if (typeof fileURI === 'string') {
      if (APP_IS_DEV) {
        return fileURI
      }

      const filename = fileURI.split('/').pop()
      const strRef = `${STORAGE_LITTEN_PHOTOS}/${docId}/${filename}`
      const storageRef = this.storage().ref(strRef)
      await storageRef.putFile(fileURI)
      const downloadURL = await storageRef.getDownloadURL()
      return downloadURL
    }
  }

  async savePhotos(doc): Promise<void> {
    const docId = doc.id
    const photos = []

    const photosToSave = []

    for (const photo of this.#photos) {
      if (typeof photo?.uri === 'string') {
        photosToSave.push(this.savePhoto(photo?.uri, docId))
      }
    }

    try {
      const savedPhotos = await Promise.all(photosToSave)

      for (const photo of savedPhotos) {
        if (photo) {
          photos.push(photo)
        }
      }
    } catch (err) {
      logError(err)
    }

    await doc.update({
      photos,
    })

    this.#photos = photos
  }

  async create(): Promise<any> {
    try {
      const littenObject = this.buildObject()
      const litten = await this.collection.add(littenObject)
      this.id = litten.id

      await this.savePhotos(litten)

      return litten
    } catch (err) {
      throw new LittenError(err)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async update(): Promise<void> {}

  async save(): Promise<void> {
    if (this.id) {
      await this.update()
    } else {
      await this.create()
    }
  }

  async toggleActive(active = true): Promise<void> {
    if (this.id) {
      try {
        await this.collection.doc(this.id).update({
          active,
          'metadata.updatedAt': firestore.FieldValue.serverTimestamp(),
        })
      } catch (err) {
        throw new LittenError(err)
      }

      this.active = active
    }
  }

  async archive(): Promise<void> {
    await this.toggleActive(false)
  }

  async activate(): Promise<void> {
    await this.toggleActive(true)
  }

  async deletePhotos(): Promise<void> {
    try {
      const storageRef = this.storage().ref(this.storageRef)
      const filesRef = await storageRef.listAll()

      for (const fileRef of filesRef.items) {
        fileRef.delete()
      }
    } catch (err) {
      logError(err)
    }
  }

  async delete(): Promise<void> {
    if (this.id) {
      try {
        await this.collection.doc(this.id).delete()
        this.deletePhotos()
      } catch (err) {
        throw new LittenError(err)
      }
    }
  }
}
