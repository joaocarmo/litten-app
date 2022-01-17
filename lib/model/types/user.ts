import type { DBLocationObject } from '@db/schemas/location'
import type { DBMetadata } from '@db/schemas/common'
import type { ImageSource } from '@ui-elements/types'

export type BasicUser = {
  id?: string
  contactPreferences?: string[]
  displayName?: string
  email?: string
  isOrganization?: boolean
  location?: DBLocationObject
  metadata?: DBMetadata
  phoneNumber?: string
  photoURL?: ImageSource
}
