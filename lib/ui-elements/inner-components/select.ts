/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line max-classes-per-file
import { Component } from 'react'
import type { Constructor, NativeMethodsMixin } from 'react-native'
import type { PickerProps } from '@react-native-picker/picker'

export type IOSSelectProps = {
  items: Array<{ key: string; label: string; value: string | number }>
  selectedValue: string | number
  selectorOpen?: boolean
  toggleModal?: () => void
} & PickerProps

declare class SelectComponent extends Component<IOSSelectProps> {}

declare const SelectBase: Constructor<NativeMethodsMixin> &
  typeof SelectComponent

export default class Select extends SelectBase {}
