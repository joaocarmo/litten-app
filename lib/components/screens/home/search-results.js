/**
 * @format
 * @flow
 */

import React, { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import LittenCard from 'components/litten-card'
import SearchHeaderResults from './search-header-results'
import SearchEmptyResults from './search-empty-results'

const SearchResults: (args: any) => React$Node = ({ littens }) => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1200)
  }

  return (
    <FlatList
      data={littens}
      renderItem={({ item }) => <LittenCard litten={item} />}
      keyExtractor={(litten) => litten._id}
      ListHeaderComponent={littens.length ? SearchHeaderResults : undefined}
      ListEmptyComponent={SearchEmptyResults}
      refreshing={isRefreshing}
      onRefresh={handleOnRefresh}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
})

export default SearchResults
