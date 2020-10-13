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
  const hasItems = littens.length > 0

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
      ListHeaderComponent={hasItems ? SearchHeaderResults : undefined}
      ListEmptyComponent={SearchEmptyResults}
      refreshing={isRefreshing}
      onRefresh={handleOnRefresh}
      contentContainerStyle={styles.contentContainer}
      bounces={hasItems}
      showsVerticalScrollIndicator={false}
      style={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    height: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
})

export default SearchResults
