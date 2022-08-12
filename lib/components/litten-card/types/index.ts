import type { AugmentedLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

export type LittenCardComponentProps = {
  distance: number
  editable?: boolean
  isFavourite?: boolean
  litten: Partial<
    AugmentedLitten & {
      distance: number
    }
  >
  onPressAction?: (litten: Partial<AugmentedLitten>) => void
  user: BasicUser
}
