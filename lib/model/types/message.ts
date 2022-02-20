import type { DBMetadata } from '@db/schemas/common'

export type BasicMessage = {
  id?: string
  chatUid?: string
  text?: string
  userUid?: string
  metadata?: DBMetadata
}
