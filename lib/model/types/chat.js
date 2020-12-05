/**
 * @format
 * @flow
 */

import type { DBMetadata } from 'db/schemas/common'

export type BasicChat = {
  id?: string,
  lastMessage?: string,
  littenSpecies?: string,
  littenType?: string,
  littenUid?: string,
  participants?: string[],
  read?: string[],
  metadata?: DBMetadata,
}

export interface ChatClass {
  constructor(basicUser: BasicChat): void;
}
