/**
 * @format
 * @flow
 */

import { StyleSheet, Text, View } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import UIImage from './image'
import { iconChevron } from 'images'
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
    <View
      {...otherProps}
      style={StyleSheet.compose(styles.uiDropdownContainer, style)}>
      <Menu
        renderer={(props) => (
          <Popover
            {...props}
            placement={placement}
            anchorStyle={styles.anchorStyle}
          />
        )}
        onSelect={(value) => onSelect(value)}>
        <MenuTrigger>
          {menuTrigger}
          {!menuTrigger && (
            <View style={styles.uiDropdown}>
              <Text style={styles.selectedValueText}>
                {translateSelectedValue()}
              </Text>
              <UIImage source={iconChevron} style={styles.iconChevron} />
            </View>
          )}
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.optionsContainer }}>
          {options.map(
            ({ key, label, value, disabled, onSelect: onOptionSelect }) => (
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
    fontWeight: '600',
    color: colors.blue,
  },
  iconChevron: {
    maxHeight: 12,
    maxWidth: 12,
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
