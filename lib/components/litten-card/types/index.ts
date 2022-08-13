import Litten from '@model/litten'
import type { AugmentedLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

export type LittenCardComponentProps = {
  distance: number
  editable?: boolean
  isFavourite?: boolean
  litten: Litten
  onPressAction?: (litten: Partial<AugmentedLitten>) => void
  user: BasicUser
}
