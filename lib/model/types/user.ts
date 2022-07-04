import type { DBLocationObject } from '@db/schemas/location'
import type { DBMetadata } from '@db/schemas/common'

export type ContactPreferences = string[]

export interface BasicUser {
  id: string
  contactPreferences: ContactPreferences
  displayName: string
  email: string
  isOrganization: boolean
  location: DBLocationObject
  metadata: DBMetadata
  phoneNumber: string
  photoURL: string
}
