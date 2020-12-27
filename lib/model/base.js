/**
 * @format
 * @flow
 */

import firestore from 'db/firestore'
import { locationSchema } from 'db/schemas/location'
import type { DBLocationObject, DBCoordinateObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'

export default class Base {
  #id
  #location
  #metadata

  get firestore() {
    return firestore
  }

  get id(): string | void {
    return this.#id
  }

  get location(): DBLocationObject | void {
    return this.#location
  }

  get coordinates(): DBCoordinateObject {
    const {
      coordinates: { latitude, longitude, _latitude, _longitude },
    } = this.#location ?? {}
    return {
      latitude: latitude ?? _latitude ?? null,
      longitude: longitude ?? _longitude ?? null,
    }
  }

  get metadata(): DBMetadata | void {
    return this.#metadata
  }

  get createdAt(): number | void {
    if (this.#metadata?.createdAt) {
      const { seconds, _seconds } = this.#metadata.createdAt
      const s = seconds ?? _seconds
      return s ? s * 1000 : s
    }
  }

  get updatedAt(): number | void {
    if (this.#metadata?.updatedAt) {
      const { seconds, _seconds } = this.#metadata.updatedAt
      const s = seconds ?? _seconds
      return s ? s * 1000 : s
    }
  }

  set id(id: string | void = '') {
    this.#id = id
  }

  set location(location: DBLocationObject = {}) {
    this.#location = { ...locationSchema, ...location }
  }

  set coordinates(coordinates: DBCoordinateObject) {
    this.#location = { ...locationSchema, coordinates }
  }

  set metadata(
    metadata: DBMetadata = {
      createdAt: {},
      updatedAt: {},
    },
  ) {
    this.#metadata = metadata
  }

  mapCommonProps({
    id = '',
    location = {},
    metadata = {
      createdAt: {},
      updatedAt: {},
    },
  }: {
    id?: string,
    location?: DBLocationObject,
    metadata?: DBMetadata,
  }) {
    this.#id = id
    this.#location = { ...locationSchema, ...location }
    this.#metadata = metadata
  }

  buildLocation() {
    const { coordinates: { latitude, longitude } = {}, ...location } =
      this.#location ?? {}
    return {
      ...location,
      coordinates: new firestore.GeoPoint(latitude ?? 0, longitude ?? 0),
    }
  }

  buildMetadata() {
    const createdAt = this.#metadata?.createdAt?.seconds
      ? this.#metadata?.createdAt
      : firestore.FieldValue.serverTimestamp()

    const updatedAt = firestore.FieldValue.serverTimestamp()

    return {
      createdAt,
      updatedAt,
    }
  }

  buildObject(): any {
    return {}
  }

  toJSON() {
    const object = this.buildObject()
    if (object.location?.coordinates) {
      object.location.coordinates = {
        latitude: object.location.coordinates.latitude ?? null,
        longitude: object.location.coordinates.longitude ?? null,
      }
    }
    if (object.metadata?.createdAt) {
      object.metadata = {
        createdAt: {
          seconds: object.metadata.createdAt.seconds,
        },
        updatedAt: {
          seconds: object.metadata.updatedAt.seconds,
        },
      }
    }
    return { id: this.#id, key: this.#id, ...object }
  }
}
