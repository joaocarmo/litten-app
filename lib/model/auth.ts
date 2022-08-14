import ServicesProvider from '@services/provider'
import type { AuthSettings } from '@model/types/auth'

export default class Auth {
  services: ServicesProvider

  #id: string

  #photoURL: string

  #displayName: string

  #email: string

  #password: string

  constructor({
    id = '',
    photoURL = '',
    displayName = '',
    email = '',
    password = '',
  }: Partial<AuthSettings>) {
    this.services = new ServicesProvider()

    const user = this.services.auth.currentUser()

    this.#id = user?.uid || id
    this.#photoURL = user?.photoURL || photoURL
    this.#displayName = user?.displayName || displayName
    this.#email = user?.email || email
    this.#password = password
  }

  signOut() {
    return this.services.auth.signOut()
  }

  get currentUser() {
    return this.services.auth.currentUser()
  }

  get id(): string {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get displayName(): string {
    return this.#displayName
  }

  set displayName(displayName: string) {
    this.#displayName = displayName
    this.services.auth.update({ displayName })
  }

  get photoURL(): string {
    return this.#photoURL
  }

  set photoURL(photoURL: string) {
    this.#photoURL = photoURL || this.#photoURL

    this.services.auth.update({ photoURL: photoURL || this.#photoURL })
  }

  get email(): string {
    return this.#email
  }

  set email(email: string) {
    this.#email = email
    this.services.auth.update({ email })
  }

  get emailVerified(): boolean {
    return this.services.auth.emailVerified()
  }

  updateOne(field: string, value: string): Promise<void> {
    return this.services.auth.update({ [field]: value })
  }

  signIn() {
    return this.services.auth.signIn({
      email: this.#email,
      password: this.#password,
    })
  }

  sendPasswordResetEmail() {
    return this.services.auth.sendPasswordResetEmail({ email: this.#email })
  }

  checkActionCode(actionCode: string) {
    return this.services.auth.checkActionCode(actionCode)
  }

  applyActionCode(actionCode: string) {
    return this.services.auth.applyActionCode(actionCode)
  }

  sendEmailVerification() {
    return this.services.auth.sendEmailVerification()
  }

  async create() {
    await this.services.auth.create({
      displayName: this.#displayName,
      email: this.#email,
      password: this.#password,
      photoURL: this.#photoURL,
    })

    this.#id = this.services.auth.currentUserId()
  }

  delete() {
    return this.services.auth.delete()
  }
}
