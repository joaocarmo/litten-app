import type { DBMetadata } from '@db/schemas/common'

export interface BasicChat {
  id: string
  lastMessage: string
  lastMessageBy: string
  littenSpecies: string
  littenType: string
  littenUid: string
  participants: string[]
  read: string[]
  metadata: DBMetadata
}
