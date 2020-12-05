/**
 * @format
 * @flow
 */

import { Pressable, StyleSheet, Text, View } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import UISeparator from 'ui-elements/separator'
import { Right as RightArrow } from 'images/components/arrows'
import { UI_ICON_SIZE_MICRO } from 'utils/constants'
import colors from 'styles/colors'

const { Popover } = renderers

const UIDropdown: (args: any) => React$Node = ({
  menuTrigger = null,
  onSelect,
  options,
  placement = 'auto',
  selectedValue,
  style,
  ...otherProps
}) => {
  const translateSelectedValue = () =>
    options.find(({ value }) => value === selectedValue)?.label

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
        onSelect={(value) => onSelect(value)}>
        <MenuTrigger
          customStyles={{
            TriggerTouchableComponent: Pressable,
          }}>
          {menuTrigger}
          {!menuTrigger && (
            <View style={styles.uiDropdown}>
              <Text style={styles.selectedValueText}>
                {translateSelectedValue()}
              </Text>
              <RightArrow
                height={UI_ICON_SIZE_MICRO}
                width={UI_ICON_SIZE_MICRO}
                fill={colors.darkerGray}
                style={styles.iconChevron}
              />
            </View>
          )}
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.optionsContainer }}>
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
                  onSelect={(optionValue) => onOptionSelect(optionValue)}
                  customStyles={{ optionWrapper: styles.optionWrapper }}>
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === value
                        ? styles.optionsTextActive
                        : undefined,
                      disabled ? styles.optionsTextDisabled : undefined,
                    ]}>
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

const styles = StyleSheet.create({
  uiDropdownContainer: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  uiDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  selectedValueText: {
    fontWeight: '700',
    color: colors.blue,
  },
  iconChevron: {
    transform: [{ rotateZ: '90deg' }],
  },
  optionsContainer: {
    padding: 10,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.gray,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: colors.white,
  },
  optionWrapper: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 64,
  },
  optionText: {
    padding: 2,
    fontWeight: '400',
    color: colors.darkGray,
  },
  optionsTextActive: {
    color: colors.blue,
  },
  optionsTextDisabled: {
    color: colors.gray,
  },
  anchorStyle: {
    backgroundColor: 'transparent',
  },
})

export default UIDropdown
