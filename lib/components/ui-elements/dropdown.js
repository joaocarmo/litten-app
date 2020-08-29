/**
 * @format
 * @flow
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'
import { iconChevron } from 'images'
import { rotate } from 'utils/functions'
import colors from 'styles/colors'

const { Popover } = renderers

const UIDropdown: (args: any) => React$Node = ({
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
          <View style={styles.uiDropdown}>
            <Text style={styles.selectedValueText}>
              {translateSelectedValue()}
            </Text>
            <Image
              source={iconChevron}
              resizeMode="contain"
              style={styles.iconChevron}
            />
          </View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.optionsContainer }}>
          {options.map(({ key, label, value }) => (
            <MenuOption key={key} value={value}>
              <Text
                style={
                  selectedValue === value
                    ? StyleSheet.compose(
                        styles.optionsText,
                        styles.optionsTextActive,
                      )
                    : styles.optionsText
                }>
                {label}
              </Text>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  uiDropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  uiDropdown: {
    display: 'flex',
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
    transform: [rotate('90deg', 'Z')],
  },
  optionsContainer: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    backgroundColor: colors.white,
  },
  optionsText: {
    padding: 2,
    fontWeight: '600',
    color: colors.darkGray,
  },
  optionsTextActive: {
    color: colors.blue,
  },
  anchorStyle: {
    height: 0,
  },
})

export default UIDropdown
