/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { RECOMMENDED_MINIMUM_TAPPABLE_SIZE } from 'utils/constants'
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
      autoCapitalize="none"
      onChangeText={setSearchInput}
      onSubmitEditing={submit}
      enablesReturnKeyAutomatically
      placeholderTextColor={colors.gray}
      style={[styles.uiSearch, style]}
    />
  )
}

const styles = StyleSheet.create({
  uiSearch: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    padding: 8,
    paddingLeft: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
  },
})

export default UISearch
