/**
 * @format
 * @flow
 */

import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { UISearch } from 'ui-elements'
import { useSearchHistory, useSearchQuery } from 'hooks'
import { translate } from 'utils/i18n'

const SearchForm: (args: any) => React$Node = ({
  showSearchHistory,
  hideSearchHistory,
}) => {
  const [searchQuery, setQuery] = useSearchQuery()
  const [, setSearchHistory] = useSearchHistory()

  useEffect(() => {
    setQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (query) => {
    setQuery(query)
    setSearchHistory(query)
    hideSearchHistory()
  }

  return (
    <UISearch
      defaultValue={searchQuery}
      onSubmit={onSubmit}
      placeholder={translate('screens.searches.headerSearchPlaceholder')}
      containerStyle={styles.search}
      onClear={() => setQuery('')}
      onFocus={showSearchHistory}
      clearable
    />
  )
}

const styles = StyleSheet.create({
  search: {
    flex: 9,
  },
})

export default SearchForm
