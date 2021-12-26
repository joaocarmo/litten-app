/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Switch } from 'react-native'
import { useTheme } from 'hooks'
import UISetting from 'ui-elements/setting'
import colors from 'styles/colors'

const UISwitch: (args: any) => Node = ({
  description,
  label,
  onValueChange,
  value,
  ...otherProps
}) => {
  const {
    theme: {
      background: backgroundColor,
      backgroundElement: backgroundElementColor,
      // FIXEM: primary: primaryColor,
    },
  } = useTheme()

  return (
    <UISetting description={description} label={label}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={backgroundColor}
        trackColor={{ false: backgroundElementColor, true: colors.purple }}
        {...otherProps}
      />
    </UISetting>
  )
}

export default UISwitch
