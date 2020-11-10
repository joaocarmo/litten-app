/**
 * @format
 * @flow
 */

import type { DBLocationObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'

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
  photoURL?: string | { uri: string },
  userAuthUid?: string,
  userUid?: string,
}

export interface UserClass {
  constructor(basicUser: BasicUser): void;
}
