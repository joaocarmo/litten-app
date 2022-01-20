/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line max-classes-per-file
import { Component } from 'react'
import { Constructor, NativeMethodsMixin, PickerProps } from 'react-native'

export type IOSSelectProps = {
  items: Array<{ key: string; label: string; value: string | number }>
  selectedValue: string | number
  selectorOpen: boolean
  toggleModal: () => void
} & PickerProps

declare class SelectComponent extends Component<IOSSelectProps> {}

declare const SelectBase: Constructor<NativeMethodsMixin> &
  typeof SelectComponent

export default class Select extends SelectBase {}
