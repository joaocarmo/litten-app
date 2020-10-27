/**
 * @format
 * @flow
 */

import { locationSchema } from './location'
import type { DBLocationObject } from './location'

export type DBUserObject = {
  userUid: string,
  location: DBLocationObject,
  phoneNumber: string,
  isOrganization: boolean,
}

export const userSchema: DBUserObject = {
  userUid: '',
  location: locationSchema,
  phoneNumber: '',
  isOrganization: false,
}
