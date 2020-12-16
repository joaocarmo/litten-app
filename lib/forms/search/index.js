/**
 * @format
 * @flow
 */

import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { UISearch } from 'ui-elements'
import { useSearchQuery } from 'hooks'
import { translate } from 'utils/i18n'

const SearchForm: (args: any) => React$Node = ({ searchInputProps = {} }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setQuery] = useSearchQuery()

  useEffect(() => {
    setQuery('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (value) => {
    setQuery(value)
  }

  return (
    <UISearch
      onSubmit={onSubmit}
      placeholder={translate('screens.searches.headerSearchPlaceholder')}
      containerStyle={styles.search}
      onClear={() => setQuery('')}
      clearable
      {...searchInputProps}
    />
  )
}

const styles = StyleSheet.create({
  search: {
    flex: 9,
  },
})

export default SearchForm
