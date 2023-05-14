/* eslint-disable react/require-default-props */
import { FC, lazy, Suspense } from 'react'
import { Platform, View } from 'react-native'
import type { PickerProps } from '@react-native-picker/picker'

export type IOSSelectProps = {
  items: Array<{ key: string; label: string; value: string | number }>
  selectedValue: string | number
  selectorOpen?: boolean
  toggleModal?: () => void
} & PickerProps

const SelectComponent = lazy(() =>
  Platform.OS === 'ios' ? import('./select.ios') : import('./select.android'),
)

const Select: FC<IOSSelectProps> = (props) => (
  <Suspense fallback={<View />}>
    <SelectComponent {...props} />
  </Suspense>
)

export default Select
