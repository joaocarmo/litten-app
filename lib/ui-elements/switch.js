/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Switch } from 'react-native'
import UISetting from 'ui-elements/setting'
import colors from 'styles/colors'

const UISwitch: (args: any) => Node = ({
  description,
  label,
  onValueChange,
  value,
  ...otherProps
}) => (
  <UISetting description={description} label={label}>
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
