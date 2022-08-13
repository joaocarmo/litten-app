import firestore, { batchLoaderFactory, DataLoader } from '@db/firestore'
import Auth from '@model/auth'
import Base from '@model/base'
import Litten from '@model/litten'
import Search from '@model/search'
import { UserError } from '@model/error/user'
import { deleteAllChatForUser } from '@db/maintenance'
import { locationSchema } from '@db/schemas/location'
import {
  DB_USER_COLLECTION,
  DEFAULT_CONTACT_PREFERENCES,
  STORAGE_IGNORED_ERRORS,
  STORAGE_USER_AVATAR,
} from '@utils/constants'
import { debugLog, logError } from '@utils/dev'
import type { BasicUser, ContactPreferences } from '@model/types/user'
import type { DBCoordinateObject, DBLocationObject } from '@db/schemas/location'

export default class User extends Base<BasicUser> {
  static COLLECTION_NAME = DB_USER_COLLECTION

  private dataLoader: DataLoader<string, BasicUser>

  #auth

  #contactPreferences

  #currentUser

  #displayName

  #email

  #isOrganization

  #phoneNumber

  #photoURL

  #search

  #deferredSave = false

  #deferredSaveObject = {}

  constructor(basicUser: Partial<BasicUser>) {
    super()

    const { id = '', contactPreferences = DEFAULT_CONTACT_PREFERENCES } =
      basicUser

    this.mapDocToProps(basicUser)

    this.#search = new Search({
      user: {
        id,
      },
    })
    this.#auth = new Auth()
    this.#currentUser = this.#auth.currentUser
    this.#contactPreferences = contactPreferences

    this.dataLoader = new DataLoader(User.loadAll, { cacheKeyFn: User.keyFn })
  }

  private static loadAll = batchLoaderFactory<BasicUser>(this.collection)

  private static keyFn = (id: string) => `${User.COLLECTION_NAME}/${id}`

  private getById(id: string) {
    return this.dataLoader.load(id)
  }

  get displayName(): string | undefined {
    return this.#displayName
  }

  set displayName(displayName: string | undefined) {
    if (displayName) {
      this.#displayName = displayName || ''
      this.updateOne('displayName', displayName)

      if (this.#currentUser) {
        this.#auth.displayName = displayName
      }
    }
  }

  get email(): string | undefined {
    return this.#email
  }

  set email(email: string | undefined) {
    if (email) {
      this.#email = email || ''
      this.updateOne('email', email)

      if (this.#currentUser) {
        this.#auth.email = email || ''
      }
    }
  }

  get photoURL(): string | undefined {
    return this.#photoURL
  }

  set photoURL(photoURL: string | undefined) {
    this.#photoURL = photoURL || ''
    this.updateOne('photoURL', photoURL)

    if (this.#currentUser && photoURL) {
      this.#auth.photoURL = photoURL
    }
  }

  get location(): DBLocationObject {
    return super.location
  }

  set location(location: DBLocationObject) {
    super.location = location || locationSchema
    this.updateOne('location', super.buildLocation())
  }

  get coordinates(): DBCoordinateObject {
    return super.coordinates
  }

  set coordinates(coordinates: DBCoordinateObject) {
    super.coordinates = coordinates
    const { latitude, longitude } = coordinates
    this.updateOne(
      'location.coordinates',
      new firestore.GeoPoint(latitude, longitude),
    )
  }

  get photoURLRef(): string {
    if (this.id) {
      const fileExt = 'jpg'
      return `${STORAGE_USER_AVATAR}/${this.id}.${fileExt}`
    }

    return ''
  }

  get phoneNumber(): string | undefined {
    return this.#phoneNumber
  }

  set phoneNumber(phoneNumber: string | undefined) {
    this.#phoneNumber = phoneNumber || ''
    this.updateOne('phoneNumber', phoneNumber)
  }

  get isOrganization(): boolean | undefined {
    return this.#isOrganization
  }

  set isOrganization(isOrganization: boolean) {
    this.#isOrganization = isOrganization || false
    this.updateOne('isOrganization', isOrganization)
  }

  get contactPreferences(): ContactPreferences {
    return this.#contactPreferences
  }

  set contactPreferences(value: string | ContactPreferences) {
    if (typeof value === 'string') {
      this.#contactPreferences = {
        ...this.#contactPreferences,
        [value]: !this.#contactPreferences[value],
      }
    } else {
      this.#contactPreferences = value || DEFAULT_CONTACT_PREFERENCES
    }

    this.updateOne('contactPreferences', this.#contactPreferences)
  }

  set deferredSave(deferredSave: boolean) {
    this.#deferredSave = deferredSave || false
  }

  async uploadAndSetPhoto(photoURL: string): Promise<void> {
    if (this.#currentUser) {
      this.deletePhoto(this.photoURLRef)

      try {
        this.#photoURL = await this.#auth.uploadAndSetPhoto(photoURL)
        this.updateOne('photoURL', this.#photoURL)
      } catch (err) {
        if (STORAGE_IGNORED_ERRORS.includes(err.code)) {
          debugLog(err)
        } else {
          logError(err)
        }
      }
    }
  }

  buildObject(): Omit<BasicUser, 'id'> {
    return {
      contactPreferences: this.#contactPreferences,
      displayName: this.#displayName,
      email: this.#email,
      isOrganization: this.#isOrganization,
      location: this.buildLocation(),
      phoneNumber: this.#phoneNumber,
      photoURL: this.#photoURL,
      metadata: this.buildMetadata(),
    }
  }

  mapDocToProps({
    contactPreferences = DEFAULT_CONTACT_PREFERENCES,
    displayName = '',
    email = '',
    isOrganization = false,
    phoneNumber = '',
    photoURL = '',
    ...otherProps
  }: Partial<BasicUser>): void {
    super.mapCommonProps(otherProps)
    this.#contactPreferences = contactPreferences
    this.#displayName = displayName
    this.#email = email
    this.#isOrganization = isOrganization
    this.#phoneNumber = phoneNumber
    this.#photoURL = photoURL
  }

  async reauthenticate(password: string): Promise<void> {
    const provider = this.#auth.EmailAuthProvider
    const email = this.#email
    const authCredential = provider.credential(email, password)
    await this.#currentUser.reauthenticateWithCredential(authCredential)
  }

  async get(): Promise<BasicUser | undefined> {
    const user = await this.getById(this.id)

    if (user) {
      this.mapDocToProps(user)

      return this.toJSON()
    }
  }

  async create(): Promise<BasicUser | null> {
    if (this.id) {
      const userObject = this.buildObject()
      await this.collection.doc(this.id).set(userObject)
      const newUserObject = { ...userObject, id: this.id }
      return newUserObject
    }

    return null
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

      if (this.#deferredSave) {
        this.#deferredSaveObject = {
          ...this.#deferredSaveObject,
          ...newUpdateObject,
        }
      } else {
        this.dataLoader.clear(this.id)
        this.collection.doc(this.id).update(newUpdateObject)
      }
    }
  }

  async updateOne(
    field: string,
    value: unknown,
    updateTimestamp = true,
  ): Promise<void> {
    const updateObject = {
      [field]: value,
    }
    this.update(updateObject, updateTimestamp)
  }

  async save(): Promise<void> {
    if (this.#deferredSave) {
      this.dataLoader.clear(this.id)
      return this.collection.doc(this.id).update(this.#deferredSaveObject)
    }
  }

  async deleteLittens(): Promise<void> {
    const ids = []
    const activePosts = await this.#search?.userPostsQuery(true).get()
    const inactivePosts = await this.#search?.userPostsQuery(false).get()

    activePosts?.docs.forEach((documentSnapshot) => {
      ids.push(documentSnapshot.id)
    })

    inactivePosts?.docs.forEach((documentSnapshot) => {
      ids.push(documentSnapshot.id)
    })

    const littensToDelete = []

    for (const id of ids) {
      const litten = new Litten({
        id,
      })

      littensToDelete.push(litten.delete())
    }

    await Promise.all(littensToDelete)

    debugLog('[USER] DELETED LITTENS', ids.length)
  }

  async deleteChats(): Promise<void> {
    if (this.id) {
      return deleteAllChatForUser(this.id)
    }
  }

  async deletePhoto(photoURLRef = ''): Promise<void> {
    const fileRef = this.storage().ref(photoURLRef || this.photoURLRef)

    try {
      await fileRef.delete()
    } catch (err) {
      if (STORAGE_IGNORED_ERRORS.includes(err.code)) {
        debugLog(err)
      } else {
        throw new UserError(err)
      }
    }
  }

  async deleteUser(): Promise<void> {
    if (this.id) {
      await this.collection.doc(this.id).delete()
    }
  }

  async deleteAuth(): Promise<void> {
    if (this.#currentUser) {
      await this.#currentUser.delete()
    }
  }

  async delete(): Promise<void> {
    await this.deleteLittens()
    await this.deleteChats()
    await this.deletePhoto()
    await this.deleteUser()
    await this.deleteAuth()
  }
}
