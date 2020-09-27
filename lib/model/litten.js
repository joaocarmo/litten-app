/**
 * @format
 * @flow
 */

import type { BasicLitten, LittenClass } from './types/litten'
import type { UserClass } from './types/user'

export default class Litten implements LittenClass {
  #location = null
  #photos = []
  #species = ''
  #story = ''
  #title = ''
  #type = ''
  #user = null

  constructor(
    { location, photos, species, story, title, type }: BasicLitten,
    user: UserClass | any,
  ) {
    this.#location = location
    this.#photos = photos
    this.#species = species
    this.#story = story
    this.#title = title
    this.#type = type
    this.#user = user
  }

  get location() {
    return this.#location
  }

  get photos() {
    return this.#photos
  }

  get species() {
    return this.#species
  }

  get story() {
    return this.#story
  }

  get title() {
    return this.#title
  }

  get type() {
    return this.#type
  }
}
