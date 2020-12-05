/**
 * @format
 * @flow
 */

import type { PhotoObject } from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'
import type { BasicUser } from 'model/types/user'

export type BasicLitten = {
  active?: boolean,
  id?: string,
  location?: DBLocationObject,
  metadata?: DBMetadata,
  photos?: PhotoObject[],
  species?: string,
  story?: string,
  title?: string,
  type?: string,
  userUid?: string,
  user?: BasicUser,
}

export interface LittenClass {
  constructor(basicLitten: BasicLitten): void;
  get active(): boolean;
  get photos(): PhotoObject[];
  get species(): string;
  get story(): string;
  get title(): string;
  get type(): string;
}
