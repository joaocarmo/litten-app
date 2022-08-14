import firestore from '@db/firestore'
import Services from '@services/services'
import ServicesProvider from '@services/provider'
import { BaseModel } from '@model/types/base'
import { locationSchema } from '@db/schemas/location'
import type { DBLocationObject, DBCoordinateObject } from '@db/schemas/location'
import type { DBMetadata, DBTimestamp } from '@db/schemas/common'

export default abstract class Base<
  T extends BaseModel = BaseModel,
> extends Services<T> {
  services: ServicesProvider

  #id: string | undefined

  #location: DBLocationObject = locationSchema

  #metadata: DBMetadata | undefined

  constructor(object?: Partial<T>) {
    super()

    if (object) {
      this.mapCommonProps(object)
    }

    this.services = new ServicesProvider()
  }

  get id(): string | undefined {
    return this.#id
  }

  set id(id: string | undefined) {
    this.#id = id
  }

  get location(): DBLocationObject {
    return this.#location
  }

  set location(location: DBLocationObject) {
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

  get metadata(): DBMetadata | undefined {
    return this.#metadata
  }

  set metadata(metadata: DBMetadata) {
    this.#metadata = metadata || {
      createdAt: {},
      updatedAt: {},
    }
  }

  get createdAt(): number | undefined {
    if (this.#metadata?.createdAt) {
      const { seconds, _seconds } = this.#metadata.createdAt
      const s = seconds ?? _seconds

      return s ? s * 1000 : s
    }
  }

  get updatedAt(): number | undefined {
    if (this.#metadata?.updatedAt) {
      const { seconds, _seconds } = this.#metadata.updatedAt
      const s = seconds ?? _seconds

      return s ? s * 1000 : s
    }
  }

  mapCommonProps({ id, location, metadata }: Partial<T>): void {
    this.#id = id || ''
    this.#metadata = {
      createdAt: {},
      updatedAt: {},
      ...metadata,
    }

    if (location) {
      this.#location = { ...locationSchema, ...location }
    }
  }

  buildLocation(): DBLocationObject {
    const {
      coordinates: { latitude, longitude },
      ...location
    } = this.#location ?? locationSchema

    return {
      ...location,
      coordinates: new firestore.GeoPoint(latitude ?? 0, longitude ?? 0),
    }
  }

  buildMetadata(): DBMetadata {
    const createdAt = this.#metadata?.createdAt?.seconds
      ? (this.#metadata?.createdAt as DBTimestamp)
      : (firestore.FieldValue.serverTimestamp() as DBTimestamp)
    const updatedAt = firestore.FieldValue.serverTimestamp() as DBTimestamp

    return {
      createdAt,
      updatedAt,
    }
  }

  buildObject(): Omit<T, 'id'> {
    return {
      location: this.buildLocation(),
      metadata: this.buildMetadata(),
    } as Omit<T, 'id'>
  }

  toJSON(): T {
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
      ...object,
    } as T
  }
}
