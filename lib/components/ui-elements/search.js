/**
 * @format
 * @flow
 */

import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import colors from 'styles/colors'

const UISearch: (args: any) => React$Node = ({
  onSubmit,
  style,
  ...otherProps
}) => {
  const [searchInput, setSearchInput] = useState('')

  const submit = () => {
    onSubmit(searchInput)
  }

  return (
    <TextInput
      {...otherProps}
      style={StyleSheet.compose(styles.uiSearch, style)}
      autoCapitalize="none"
      enablesReturnKeyAutomatically
      onChangeText={setSearchInput}
      onSubmitEditing={submit}
    />
  )
}

const styles = StyleSheet.create({
  uiSearch: {
    minHeight: 36,
    padding: 8,
    paddingLeft: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
  },
})

export default UISearch
