/**
 * @format
 * @flow
 */

import type { DBLocationObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'
import type { PhotoObject } from 'store/types'

export type BasicUser = {
  id?: string,
  contactPreferences?: string[],
  displayName?: string,
  email?: string,
  isOrganization?: boolean,
  location?: DBLocationObject,
  metadata?: DBMetadata,
  phoneNumber?: string,
  photoURL?: PhotoObject,
}

export interface UserClass {
  constructor(basicUser: BasicUser): void;
}
