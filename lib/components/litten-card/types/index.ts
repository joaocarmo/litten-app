import type { GestureResponderEvent } from 'react-native'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'

export type LittenCardComponentProps = {
  distance: number
  editable: boolean
  isFavourite: boolean
  litten: BasicLitten
  onPressAction: ((event: GestureResponderEvent) => void) | null | undefined
  user: BasicUser
}
