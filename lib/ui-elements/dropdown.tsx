import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { ViewProps } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { useTheme } from '@hooks'
import UISeparator from '@ui-elements/separator'
import { Right as RightArrow } from '@images/components/arrows'
import { UI_ICON_SIZE_MICRO } from '@utils/constants'
import dropdownStyles from '@ui-elements/dropdown.styles'

const { Popover } = renderers

export type UIDropdownValue = string | number | boolean

export type UIDropdownOption = {
  key: string
  label?: string
  value?: UIDropdownValue
  disabled?: boolean
  separator?: boolean
  onSelect?: (optionValue: UIDropdownValue) => void
}

export type UIDropdownSeparator = {
  separator?: boolean
}

export type UIDropdownValidOption = UIDropdownOption & UIDropdownSeparator

export type UIDropdownProps = {
  menuTrigger?: ReactNode
  onSelect?: (optionValue: UIDropdownValue) => void
  options: UIDropdownValidOption[]
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto'
  selectedValue?: UIDropdownValue
} & ViewProps

const UIDropdown = ({
  menuTrigger,
  onSelect,
  options,
  placement,
  selectedValue,
  style,
  ...otherProps
}: UIDropdownProps) => {
  const {
    createStyles,
    theme: { colors },
  } = useTheme()

  const styles = createStyles(dropdownStyles)

  const translatedSelectedValue = useMemo(
    () => options.find(({ value }) => value === selectedValue)?.label,
    [options, selectedValue],
  )

  const handleOnSelect = useCallback(
    (optionValue: UIDropdownValue) => {
      if (typeof onSelect === 'function') {
        onSelect(optionValue)
      }
    },
    [onSelect],
  )

  const renderPopover = useCallback(
    (props) => (
      <Popover
        {...props}
        placement={placement}
        anchorStyle={styles.anchorStyle}
      />
    ),
    [placement, styles.anchorStyle],
  )

  const renderOptions = useMemo(
    () =>
      options.map(
        ({
          key,
          label,
          value,
          disabled,
          separator,
          onSelect: onOptionSelect,
        }) =>
          separator ? (
            <UISeparator key={key} small />
          ) : (
            <MenuOption
              key={key}
              value={value}
              disabled={disabled}
              onSelect={() => onOptionSelect(value)}
              customStyles={{
                optionWrapper: styles.optionWrapper,
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedValue === value
                    ? styles.optionsTextActive
                    : undefined,
                  disabled ? styles.optionsTextDisabled : undefined,
                ]}
              >
                {label}
              </Text>
            </MenuOption>
          ),
      ),
    [
      options,
      selectedValue,
      styles.optionText,
      styles.optionWrapper,
      styles.optionsTextActive,
      styles.optionsTextDisabled,
    ],
  )

  return (
    <View {...otherProps} style={[styles.uiDropdownContainer, style]}>
      <Menu renderer={renderPopover} onSelect={handleOnSelect}>
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: Pressable,
          }}
        >
          {menuTrigger}
          {!menuTrigger && (
            <View style={styles.uiDropdown}>
              <Text style={styles.selectedValueText}>
                {translatedSelectedValue}
              </Text>
              <RightArrow
                height={UI_ICON_SIZE_MICRO}
                width={UI_ICON_SIZE_MICRO}
                fill={colors.neutralDarker}
                style={styles.iconChevron}
              />
            </View>
          )}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.optionsContainer,
          }}
        >
          {renderOptions}
        </MenuOptions>
      </Menu>
    </View>
  )
}

UIDropdown.defaultProps = {
  menuTrigger: null,
  onSelect: undefined,
  placement: 'auto',
  selectedValue: undefined,
}

export default UIDropdown
