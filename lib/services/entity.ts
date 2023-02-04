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

  get(id: string): Promise<T> {
    this.logger.debug(`Getting ${this.COLLECTION_NAME} with id: ${id}`)

    return this.dataLoader.load(id)
  }

  async create(data: Omit<T, 'id'>, options?: CreateOptions): Promise<T> {
    let { id } = options || {}

    if (id) {
      await this.collection.doc(id).set(data)
    } else {
      await this.collection.add(data)

      id = this.collection.doc().id
    }

    const createdObject = {
      id,
      ...data,
    } as T

    this.dataLoader.clear(id).prime(id, createdObject)

    this.logger.debug(`Created ${this.COLLECTION_NAME} with id: ${id}`)

    return createdObject
  }

  async update(
    id: string,
    data: Partial<T>,
    options?: UpdateOptions,
  ): Promise<T> {
    const updateData = this.updateMetadata(data, options)

    await this.collection.doc(id).update(updateData)

    this.dataLoader.clear(id)

    this.logger.debug(`Updated ${this.COLLECTION_NAME} with id: ${id}`)

    return this.dataLoader.load(id)
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete()

    this.dataLoader.clear(id)

    this.logger.debug(`Deleted ${this.COLLECTION_NAME} with id: ${id}`)
  }
}
