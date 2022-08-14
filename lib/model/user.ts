import firestore from '@db/firestore'
import Base from '@model/base'
import Litten from '@model/litten'
import Search from '@model/search'
import { deleteAllChatForUser } from '@db/maintenance'
import { locationSchema } from '@db/schemas/location'
import {
  DB_USER_COLLECTION,
  DEFAULT_CONTACT_PREFERENCES,
} from '@utils/constants'
import { debugLog } from '@utils/dev'
import type { BasicUser, ContactPreferences } from '@model/types/user'
import type { DBCoordinateObject, DBLocationObject } from '@db/schemas/location'

export default class User extends Base<BasicUser> {
  static COLLECTION_NAME = DB_USER_COLLECTION

  #contactPreferences: ContactPreferences

  #displayName: string

  #email: string

  #isOrganization: boolean

  #phoneNumber: string

  #photoURL: string

  #search: Search

  #deferredSave = false

  #deferredSaveObject: Partial<BasicUser> = {}

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

    this.#contactPreferences = contactPreferences
  }

  get displayName(): string | undefined {
    return this.#displayName
  }

  set displayName(displayName: string | undefined) {
    if (displayName) {
      this.#displayName = displayName || ''
      this.updateOne('displayName', displayName)
    }
  }

  get email(): string | undefined {
    return this.#email
  }

  set email(email: string | undefined) {
    if (email) {
      this.#email = email || ''
      this.updateOne('email', email)
    }
  }

  get photoURL(): string | undefined {
    return this.#photoURL
  }

  set photoURL(photoURL: string | undefined) {
    this.#photoURL = photoURL || ''
    this.updateOne('photoURL', photoURL)
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
    await this.services.auth.deletePhoto()

    await this.services.auth.update({ photoURL })

    const newPhotoURL = this.services.auth.currentUserPhotoUrl()

    await this.updateOne('photoURL', newPhotoURL)

    this.#photoURL = newPhotoURL
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

  reauthenticate(password: string) {
    return this.services.auth.reauthenticate({
      email: this.#email,
      password,
    })
  }

  async get() {
    const user = await this.services.user.get(this.id)

    if (user) {
      this.mapDocToProps(user)

      return this.toJSON()
    }
  }

  async create(): Promise<BasicUser | null> {
    if (this.id) {
      const userObject = this.buildObject()

      await this.services.user.create(userObject, { id: this.id })

      return this.toJSON()
    }

    return null
  }

  async update(updateObject: Partial<BasicUser>, updateTimestamp = true) {
    if (this.id) {
      if (this.#deferredSave) {
        this.#deferredSaveObject = {
          ...this.#deferredSaveObject,
          ...updateObject,
        }
      } else {
        await this.services.user.update(this.id, updateObject, {
          updateTimestamp,
        })

        await this.services.auth.update({
          displayName: updateObject.displayName,
          email: updateObject.email,
          photoURL: updateObject.photoURL,
        })
      }
    }
  }

  updateOne(field: string, value: unknown, updateTimestamp = true) {
    const updateObject = {
      [field]: value,
    }

    return this.update(updateObject, updateTimestamp)
  }

  save() {
    if (this.#deferredSave) {
      return this.services.user.update(this.id, this.#deferredSaveObject)
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

  deletePhoto() {
    return this.services.auth.deletePhoto()
  }

  deleteUser() {
    if (this.id) {
      return this.services.user.delete(this.id)
    }
  }

  deleteAuth() {
    return this.services.auth.delete()
  }

  async delete(): Promise<void> {
    await this.deleteLittens()
    await this.deleteChats()
    await this.deletePhoto()
    await this.deleteUser()
    await this.deleteAuth()
  }
}
