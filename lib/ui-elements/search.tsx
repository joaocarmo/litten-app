import { useCallback, useEffect, useState } from 'react'
import { Pressable, TextInput, View, ViewProps } from 'react-native'
import type { TextInputProps } from 'react-native'
import { UIText } from '@ui-elements'
import { useTheme } from '@hooks'
import { RECOMMENDED_MINIMUM_TAPPABLE_SIZE } from '@utils/constants'
import { translate } from '@utils/i18n'

export type UISearchProps = {
  clearable?: boolean
  containerStyle?: ViewProps['style']
  defaultValue?: string
  onClear?: () => void
  onSubmit?: (value: string) => void
} & TextInputProps

const UISearch = ({
  clearable,
  containerStyle,
  defaultValue,
  onClear,
  onSubmit,
  style,
  ...otherProps
}: UISearchProps) => {
  const [searchInput, setSearchInput] = useState(defaultValue)
  const {
    createStyles,
    theme: { colors },
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
      color: theme.colors.text,
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
    if (typeof onSubmit === 'function') {
      onSubmit(searchInput)
    }
  }, [onSubmit, searchInput])

  const clear = useCallback(() => {
    setSearchInput('')

    if (typeof onClear === 'function') {
      onClear()
    }
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
        placeholderTextColor={colors.neutral}
        style={[styles.uiSearch, style]}
      />
      {clearable && (
        <Pressable onPress={clear} style={styles.uiSearchClearable}>
          <UIText noPadding style={styles.uiSearchClearableText}>
            {translate('cta.clear')}
          </UIText>
        </Pressable>
      )}
    </View>
  )
}

UISearch.defaultProps = {
  clearable: false,
  containerStyle: undefined,
  defaultValue: '',
  onClear: undefined,
  onSubmit: undefined,
}

export default UISearch
