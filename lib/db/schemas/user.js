/**
 * @format
 * @flow
 */

import { locationSchema } from './location'
import type { DBLocationObject } from './location'

export type DBUserObject = {
  userUuid: string,
  location: DBLocationObject,
  phoneNumber: string,
  isOrganization: boolean,
}

export const userSchema: DBUserObject = {
  userUuid: '',
  location: locationSchema,
  phoneNumber: '',
  isOrganization: false,
}
