import { Picker } from '@react-native-picker/picker'

const UISelectPicker = ({ items, ...otherProps }) => (
  <Picker {...otherProps}>
    {items.map(({ key, label, value }) => (
      <Picker.Item key={key} label={label} value={value} />
    ))}
  </Picker>
)

export default UISelectPicker
