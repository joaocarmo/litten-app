import { useCallback } from 'react'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
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
import { UI_DROPDOWN_MARGIN, UI_ICON_SIZE_MICRO } from '@utils/constants'

const { Popover } = renderers

export type UIDropdownValue = string | number

export type UIDropdownOption = {
  key: string
  label: string
  value: UIDropdownValue
  disabled: boolean
  separator: boolean
  onSelect: (optionValue: UIDropdownValue) => void
}

export type UIDropdownProps = {
  menuTrigger?: ReactNode
  onSelect: (optionValue: UIDropdownValue) => void
  options: UIDropdownOption[]
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto'
  selectedValue: UIDropdownValue
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
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    uiDropdownContainer: {
      flexDirection: 'row',
      marginTop: UI_DROPDOWN_MARGIN,
      marginBottom: UI_DROPDOWN_MARGIN,
    },
    uiDropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderRadius: 20,
      backgroundColor: theme.colors.background,
    },
    selectedValueText: {
      fontWeight: typography.fontWeight.bolder,
      color: theme.colors.secondary,
    },
    iconChevron: {
      transform: [
        {
          rotateZ: '90deg',
        },
      ],
    },
    optionsContainer: {
      padding: 10,
      borderRadius: 6,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.neutral,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      backgroundColor: theme.colors.background,
    },
    optionWrapper: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 64,
    },
    optionText: {
      padding: 2,
      fontWeight: typography.fontWeight.light,
      color: theme.colors.neutralDark,
    },
    optionsTextActive: {
      color: theme.colors.secondary,
    },
    optionsTextDisabled: {
      color: theme.colors.neutral,
    },
    anchorStyle: {
      backgroundColor: 'transparent',
    },
  }))

  const translateSelectedValue = useCallback(
    () => options.find(({ value }) => value === selectedValue)?.label,
    [options, selectedValue],
  )

  return (
    <View {...otherProps} style={[styles.uiDropdownContainer, style]}>
      <Menu
        renderer={(props) => (
          <Popover
            {...props}
            placement={placement}
            anchorStyle={styles.anchorStyle}
          />
        )}
        onSelect={(value) => onSelect(value)}
      >
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: Pressable,
          }}
        >
          {menuTrigger}
          {!menuTrigger && (
            <View style={styles.uiDropdown}>
              <Text style={styles.selectedValueText}>
                {translateSelectedValue()}
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
          {options.map(
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
          )}
        </MenuOptions>
      </Menu>
    </View>
  )
}

UIDropdown.defaultProps = {
  menuTrigger: null,
  placement: 'auto',
}

export default UIDropdown
