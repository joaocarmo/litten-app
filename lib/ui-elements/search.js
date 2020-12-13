/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { RECOMMENDED_MINIMUM_TAPPABLE_SIZE } from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const UISearch: (args: any) => React$Node = ({
  clearable = false,
  containerStyle,
  onClear,
  onSubmit,
  style,
  ...otherProps
}) => {
  const [searchInput, setSearchInput] = useState('')

  const submit = () => {
    onSubmit(searchInput)
  }

  const clear = () => {
    setSearchInput('')
    onClear()
  }

  return (
    <View style={[styles.uiSearchContainer, containerStyle]}>
      <TextInput
        {...otherProps}
        autoCapitalize="none"
        returnKeyType="search"
        value={searchInput}
        onChangeText={setSearchInput}
        onSubmitEditing={submit}
        enablesReturnKeyAutomatically
        placeholderTextColor={colors.gray}
        style={[styles.uiSearch, style]}
      />
      {clearable && (
        <Pressable onPress={clear} style={styles.uiSearchClearable}>
          <Text style={styles.uiSearchClearableText}>
            {translate('cta.clear')}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  uiSearchContainer: {
    position: 'relative',
  },
  uiSearch: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    padding: 8,
    paddingLeft: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
  },
  uiSearchClearable: {
    position: 'absolute',
    top: RECOMMENDED_MINIMUM_TAPPABLE_SIZE / 3,
    right: RECOMMENDED_MINIMUM_TAPPABLE_SIZE / 3,
    zIndex: 1,
  },
  uiSearchClearableText: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: '400',
  },
})

export default UISearch
