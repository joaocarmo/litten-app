/**
 * @format
 * @flow
 */

import { locationSchema } from './location'
import type { DBLocationObject } from './location'

export type DBUserObject = {
  authUuid: string,
  location: DBLocationObject,
  phoneNumber: string,
  isOrganization: boolean,
}

export const userSchema: DBUserObject = {
  authUuid: '',
  location: locationSchema,
  phoneNumber: '',
  isOrganization: false,
}
