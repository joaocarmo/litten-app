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

  get id(): string | void {
    return this.#id
  }

  get location(): DBLocationObject | void {
    return this.#location
  }

  get coordinates(): DBCoordinateObject | void {
    if (this.#location?.coordinates) {
      const {
        latitude,
        longitude,
        _latitude,
        _longitude,
      } = this.#location.coordinates
      return {
        latitude: latitude ?? _latitude ?? null,
        longitude: longitude ?? _longitude ?? null,
      }
    }
  }

  get metadata(): DBMetadata | void {
    return this.#metadata
  }

  get createdAt(): number | void {
    if (this.#metadata?.createdAt) {
      const { seconds, _seconds } = this.#metadata.createdAt
      return (seconds ?? _seconds) * 1000
    }
  }

  get updatedAt(): number | void {
    if (this.#metadata?.updatedAt) {
      const { seconds, _seconds } = this.#metadata.updatedAt
      return (seconds ?? _seconds) * 1000
    }
  }

  set id(id: string) {
    this.#id = id
  }

  set location(location: DBLocationObject | void = {}) {
    this.#location = { ...locationSchema, ...location }
  }

  set metadata(metadata: DBMetadata) {
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
    return {
      createdAt:
        this.#metadata?.createdAt ?? firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    }
  }

  buildObject() {
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
