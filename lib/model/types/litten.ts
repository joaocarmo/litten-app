import type { PhotoObject } from '@store/types'
import type { DBLocationObject } from '@db/schemas/location'
import type { DBMetadata } from '@db/schemas/common'
import type { BasicUser } from '@model/types/user'

export type BasicLitten = {
  active?: boolean
  id?: string
  location?: DBLocationObject
  metadata?: DBMetadata
  photos?: PhotoObject[]
  readonly mainPhoto?: PhotoObject
  species?: string
  story?: string
  title?: string
  type?: string
  userUid?: string
  user?: BasicUser | null
  tags?: string[]
  readonly createdAt?: number
  readonly updatedAt?: number
}
