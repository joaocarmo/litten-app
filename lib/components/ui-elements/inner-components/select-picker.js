/**
 * @format
 * @flow
 */

import React from 'react'
import { Picker } from '@react-native-community/picker'

const UISelectPicker: (args: any) => React$Node = ({
  items,
  ...otherProps
}) => (
  <Picker {...otherProps} enabled={false}>
    {items.map(({ key, label, value }) => (
      <Picker.Item key={key} label={label} value={value} />
    ))}
  </Picker>
)

export default UISelectPicker
