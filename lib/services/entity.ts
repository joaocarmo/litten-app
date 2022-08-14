import { batchLoaderFactory, DataLoader } from '@db/firestore'
import Services, { UpdateOptions } from '@services/services'
import type { BaseRecord } from '@db/firestore'

export interface CreateOptions {
  id?: string
}

export default abstract class EntityService<
  T extends BaseRecord = BaseRecord,
> extends Services<T> {
  private dataLoader: DataLoader<string, T>

  constructor() {
    super()

    this.dataLoader = new DataLoader(batchLoaderFactory<T>(this.collection), {
      cacheKeyFn: (id: string) => `${this.COLLECTION_NAME}/${id}`,
    })
  }

  get(id: string) {
    this.logger.debug(`Getting ${this.COLLECTION_NAME} with id: ${id}`)

    return this.dataLoader.load(id)
  }

  create(data: Omit<T, 'id'>, options?: CreateOptions) {
    const { id } = options || {}

    this.logger.debug(`Creating ${this.COLLECTION_NAME} with id: ${id}`)

    if (id) {
      return this.collection.doc(id).set(data)
    }

    return this.collection.add(data)
  }

  update(id: string, data: Partial<T>, options?: UpdateOptions) {
    const updateData = this.updateMetadata(data, options)

    this.dataLoader.clear(id)

    this.logger.debug(`Updating ${this.COLLECTION_NAME} with id: ${id}`)

    return this.collection.doc(id).update(updateData)
  }

  delete(id: string) {
    this.dataLoader.clear(id)

    this.logger.debug(`Deleting ${this.COLLECTION_NAME} with id: ${id}`)

    return this.collection.doc(id).delete()
  }
}
