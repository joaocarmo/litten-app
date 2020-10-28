/**
 * @format
 * @flow
 */

import type { DBLocationObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'

export type BasicUser = {
  id?: string,
  displayName?: string,
  isOrganization?: boolean,
  location?: DBLocationObject,
  metadata?: DBMetadata,
  phoneNumber?: string,
  photoURL?: string | { uri: string },
  userAuthUid?: string,
  userUid?: string,
  [key: string]: any,
}

export interface UserClass {
  constructor(basicUser: BasicUser): void;
}
