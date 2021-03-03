/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { UISearch } from 'ui-elements'
import { useSearchHistory, useSearchQuery } from 'hooks'
import { translate } from 'utils/i18n'

const SearchForm: (args: any) => React$Node = ({
  showSearchHistory,
  hideSearchHistory,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setQuery] = useSearchQuery()
  const [, setSearchHistory] = useSearchHistory()

  useEffect(() => {
    setQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
    showSearchHistory()
  }, [showSearchHistory])

  const isClearable = useCallback(() => {
    return isFocused || searchQuery.length > 0
  }, [isFocused, searchQuery.length])

  const onSubmit = useCallback(
    (query) => {
      setQuery(query)
      setSearchHistory(query)
      hideSearchHistory()
    },
    [hideSearchHistory, setQuery, setSearchHistory],
  )

  return (
    <UISearch
      defaultValue={searchQuery}
      onSubmit={onSubmit}
      placeholder={translate('screens.searches.headerSearchPlaceholder')}
      containerStyle={styles.search}
      onClear={() => setQuery('')}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      clearable={isClearable()}
    />
  )
}

const styles = StyleSheet.create({
  search: {
    flex: 9,
  },
})

export default SearchForm
