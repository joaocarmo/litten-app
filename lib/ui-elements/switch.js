/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Switch } from 'react-native'
import { useTheme } from 'hooks'
import UISetting from 'ui-elements/setting'

const UISwitch: (args: any) => Node = ({
  description,
  label,
  onValueChange,
  value,
  ...otherProps
}) => {
  const {
    theme: { colors },
  } = useTheme()

  return (
    <UISetting description={description} label={label}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={colors.background}
        trackColor={{
          false: colors.backgroundElementLight,
          true: colors.primary,
        }}
        {...otherProps}
      />
    </UISetting>
  )
}

export default UISwitch
