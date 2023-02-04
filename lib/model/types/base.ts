import type { DBLocationObject } from '@db/schemas/location'
import type { DBMetadata } from '@db/schemas/common'

export interface BaseModel {
  id: string
  location?: DBLocationObject
  metadata: DBMetadata
}
