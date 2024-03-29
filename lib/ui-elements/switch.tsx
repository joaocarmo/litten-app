import { Switch } from 'react-native'
import type { SwitchProps } from 'react-native'
import { useTheme } from '@hooks'
import UISetting from '@ui-elements/setting'

export type UISwitchProps = {
  description?: string
  label: string
} & SwitchProps

const UISwitch = ({
  description,
  label,
  onValueChange,
  value,
  ...otherProps
}: UISwitchProps) => {
  const {
    theme: { colors },
  } = useTheme()

  return (
    <UISetting description={description} label={label}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? colors.neutral : colors.neutralDark}
        trackColor={{
          false: colors.backgroundElementLight,
          true: colors.primary,
        }}
        {...otherProps}
      />
    </UISetting>
  )
}

UISwitch.defaultProps = {
  description: '',
}

export default UISwitch
