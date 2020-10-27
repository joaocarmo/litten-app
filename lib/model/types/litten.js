/**
 * @format
 * @flow
 */

import type { PhotoObject } from 'store/types'
import type { DBLocationObject } from 'db/schemas/location'
import type { DBMetadata } from 'db/schemas/common'

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
  [key: string]: any,
}

export interface LittenClass {
  constructor(basicLitten: BasicLitten): void;
  get active(): boolean;
  get location(): DBLocationObject;
  get photos(): PhotoObject[];
  get species(): string;
  get story(): string;
  get title(): string;
  get type(): string;
}
