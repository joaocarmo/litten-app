/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import type { Node } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useTheme } from 'hooks'
import { RECOMMENDED_MINIMUM_TAPPABLE_SIZE } from 'utils/constants'
import { translate } from 'utils/i18n'

const UISearch: (args: any) => Node = ({
  clearable = false,
  containerStyle,
  defaultValue = '',
  onClear,
  onSubmit,
  style,
  ...otherProps
}) => {
  const [searchInput, setSearchInput] = useState(defaultValue)

  const {
    createStyles,
    theme: { neutral: neutralColor },
    typography,
  } = useTheme()

  const styles = createStyles((theme) => ({
    uiSearchContainer: {
      position: 'relative',
    },
    uiSearch: {
      minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
      padding: 8,
      paddingLeft: 24,
      borderRadius: 24,
      backgroundColor: theme.colors.background,
    },
    uiSearchClearable: {
      position: 'absolute',
      right: RECOMMENDED_MINIMUM_TAPPABLE_SIZE / 3,
      minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
      minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 1,
    },
    uiSearchClearableText: {
      color: theme.colors.neutralDark,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.light,
    },
  }))

  const submit = useCallback(() => {
    onSubmit(searchInput)
  }, [onSubmit, searchInput])

  const clear = useCallback(() => {
    setSearchInput('')
    onClear()
  }, [onClear])

  useEffect(() => {
    setSearchInput(defaultValue)
  }, [defaultValue])

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
        placeholderTextColor={neutralColor}
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

export default UISearch
