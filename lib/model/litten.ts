import { uploadAndGetDownloadUrl } from '@db/storage'
import Base from '@model/base'
import { LittenError } from '@model/error/litten'
import { string2tags } from '@utils/functions'
import { logError } from '@utils/dev'
import { DB_LITTEN_COLLECTION, STORAGE_LITTEN_PHOTOS } from '@utils/constants'
import type { AugmentedLitten, BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { PhotoObject } from '@store/types'

export default class Litten extends Base<BasicLitten> {
  static COLLECTION_NAME = DB_LITTEN_COLLECTION

  #active: boolean

  #photos: PhotoObject[]

  #species: string

  #story: string

  #title: string

  #type: string

  #user: BasicUser | null

  #userUid: string

  #tags: string[]

  constructor({ user = null, ...basicLitten }: Partial<AugmentedLitten>) {
    super()

    this.mapDocToProps(basicLitten)

    this.#user = user
    this.#userUid = this.#userUid || this.#user?.id
  }

  get storagePath(): string {
    if (this.id) {
      return `${STORAGE_LITTEN_PHOTOS}/${this.id}`
    }

    return ''
  }

  get active(): (boolean & (void | boolean)) | boolean {
    return this.#active
  }

  set active(active: boolean) {
    this.#active = active || false
  }

  get photos(): PhotoObject[] {
    return this.#photos ?? []
  }

  set photos(photos: PhotoObject[]) {
    this.#photos = photos || []
  }

  get mainPhoto(): PhotoObject {
    return this.photos[0]
  }

  get species(): string {
    return this.#species || ''
  }

  set species(species: string) {
    this.#species = species || ''
  }

  get story(): string {
    return this.#story || ''
  }

  set story(story: string) {
    this.#story = story || ''
  }

  get title(): string {
    return this.#title || ''
  }

  set title(title: string) {
    this.#title = title || ''
  }

  get type(): string {
    return this.#type || ''
  }

  set type(type: string) {
    this.#type = type || ''
  }

  get userUid(): string {
    return this.#userUid || ''
  }

  set userUid(userUid: string) {
    this.#userUid = userUid || ''
  }

  get user(): BasicUser | null {
    return this.#user
  }

  set user(user: BasicUser | null) {
    this.#user = user
  }

  get contactPreferences(): Partial<BasicUser['contactPreferences']> {
    return this.#user?.contactPreferences ?? {}
  }

  get tags(): string[] {
    return this.#tags
  }

  set tags(tags: string | string[]) {
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

  buildObject(): Omit<BasicLitten, 'id'> {
    return {
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
  }: Partial<BasicLitten>): void {
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

  async get() {
    const litten = await this.services.litten.get(this.id)

    if (litten) {
      this.mapDocToProps(litten)

      return this.toJSON()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async savePhoto(fileURI: string, docId: string): Promise<string> {
    const filename = fileURI.split('/').pop()
    const strRef = `${STORAGE_LITTEN_PHOTOS}/${docId}/${filename}`
    const downloadURL = await uploadAndGetDownloadUrl(strRef, fileURI)

    return downloadURL
  }

  async savePhotos(doc: BasicLitten) {
    const docId = doc.id
    const photos = []

    const photosToSave = []

    for (const photo of this.#photos) {
      const photoUri = typeof photo === 'string' ? photo : photo.uri

      if (typeof photoUri === 'string') {
        photosToSave.push(this.savePhoto(photoUri, docId))
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

    await this.services.litten.update(docId, {
      photos,
    })

    this.#photos = photos
  }

  async create() {
    try {
      const littenObject = this.buildObject()

      const littenDoc = await this.services.litten.create(littenObject)

      if (littenDoc) {
        this.id = littenDoc.id

        await this.savePhotos(littenDoc)

        return littenDoc
      }
    } catch (err) {
      throw new LittenError(err)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this
  async update() {}

  save() {
    if (this.id) {
      return this.update()
    } else {
      return this.create()
    }
  }

  async toggleActive(active = true) {
    if (this.id) {
      try {
        await this.services.litten.update(this.id, {
          active,
        })
      } catch (err) {
        throw new LittenError(err)
      }

      this.active = active
    }
  }

  archive() {
    return this.toggleActive(false)
  }

  activate() {
    return this.toggleActive(true)
  }

  async deletePhotos(): Promise<void> {
    try {
      const storageRef = this.storageRef()
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
        await this.services.litten.delete(this.id)

        this.deletePhotos()
      } catch (err) {
        throw new LittenError(err)
      }
    }
  }
}
