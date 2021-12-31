import type { DBTimestamp } from '../db/schemas/common'
import firestore from 'db/firestore'
import { locationSchema } from 'db/schemas/location'
import type { DBLocationObject, DBCoordinateObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'
export default class Base {
  #id
  #location
  #metadata

  get firestore(): any {
    return firestore
  }

  get id(): string | void {
    return this.#id
  }

  set id(id: string | void = '') {
    this.#id = id
  }

  get location(): DBLocationObject | void {
    return this.#location
  }

  set location(location: DBLocationObject = {}) {
    this.#location = { ...locationSchema, ...location }
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

  set coordinates(coordinates: DBCoordinateObject) {
    this.#location = { ...locationSchema, coordinates }
  }

  get metadata(): DBMetadata | void {
    return this.#metadata
  }

  set metadata(
    metadata: DBMetadata = {
      createdAt: {},
      updatedAt: {},
    },
  ) {
    this.#metadata = metadata
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

  mapCommonProps({
    id = '',
    location = {},
    metadata = {
      createdAt: {},
      updatedAt: {},
    },
  }: {
    id?: string
    location?: DBLocationObject
    metadata?: DBMetadata
  }): void {
    this.#id = id
    this.#location = { ...locationSchema, ...location }
    this.#metadata = metadata
  }

  buildLocation(): {
    administrativeArea1: string
    administrativeArea2: string
    administrativeArea3: string
    administrativeArea4: string
    administrativeArea5: string
    administrativeArea6: string
    coordinates: any
    country: string
    street: string
  } {
    const { coordinates: { latitude, longitude } = {}, ...location } =
      this.#location ?? {}

    return {
      ...location,
      coordinates: new firestore.GeoPoint(latitude ?? 0, longitude ?? 0),
    }
  }

  buildMetadata(): {
    createdAt: any | DBTimestamp
    updatedAt: any
  } {
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

  toJSON(): any {
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

    return {
      id: this.#id,
      key: this.#id,
      ...object,
    }
  }
}
