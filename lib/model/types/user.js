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
  emailVerified?: boolean,
  isOrganization?: boolean,
  location?: DBLocationObject,
  metadata?: DBMetadata,
  phoneNumber?: string,
  photoURL?: PhotoObject,
  userAuthUid?: string,
  userUid?: string,
}

export interface UserClass {
  constructor(basicUser: BasicUser): void;
}
