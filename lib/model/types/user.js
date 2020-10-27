/**
 * @format
 * @flow
 */

import type { DBLocationObject } from 'db/schemas/location'

export type BasicUser = {
  id: string,
  displayName: string,
  isOrganization: boolean,
  location: DBLocationObject,
  photoURL: string | { uri: string },
  userUid: string,
}

export interface UserClass {}
