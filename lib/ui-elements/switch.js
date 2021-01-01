/**
 * @format
 * @flow
 */

import { Switch } from 'react-native'
import UISetting from 'ui-elements/setting'
import colors from 'styles/colors'

const UISwitch: (args: any) => React$Node = ({
  children,
  label,
  onValueChange,
  value,
  ...otherProps
}) => (
  <UISetting label={label ?? children}>
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={colors.white}
      trackColor={{ false: colors.iosLightGray, true: colors.purple }}
      {...otherProps}
    />
  </UISetting>
)

export default UISwitch
