import type { DBMetadata } from '@db/schemas/common'

export interface BasicMessage {
  chatUid: string
  id: string
  metadata: DBMetadata
  text: string
  userUid: string
}
