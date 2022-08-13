import type { PhotoObject } from '@store/types'
import type { DBLocationObject } from '@db/schemas/location'
import type { DBMetadata } from '@db/schemas/common'
import type { BasicUser } from '@model/types/user'

export interface BasicLitten {
  active: boolean
  id: string
  location: DBLocationObject
  metadata: DBMetadata
  photos: PhotoObject[]
  species: string
  story: string
  tags: string[]
  title: string
  type: string
  userUid: string
}

export interface AugmentedLitten extends BasicLitten {
  readonly createdAt: number
  readonly mainPhoto: PhotoObject
  readonly updatedAt: number
  user: BasicUser | null
}
