/**
 * @format
 * @flow
 */

import { locationSchema } from './location'
import type { DBLocationObject } from './location'
import type { DBMetadata } from './common'

export type DBUserObject = {
  userAuthUid: string,
  userUid: string,
  location: DBLocationObject,
  phoneNumber: string,
  isOrganization: boolean,
  metadata: DBMetadata,
}

export const userSchema: DBUserObject = {
  userAuthUid: '',
  userUid: '',
  location: locationSchema,
  phoneNumber: '',
  isOrganization: false,
  metadata: {
    createdAt: null,
    updatedAt: null,
  },
}
