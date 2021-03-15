/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import type { Node } from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useSearchFiltersSpecies } from 'hooks'
import { UIIcon, UIText } from 'ui-elements'
import { littenSpeciesList } from 'utils/litten'

const SearchHeaderResults: (args: any) => Node = () => {
  const [littenSpecies, addSpecies, removeSpecies] = useSearchFiltersSpecies()

  const isSelected = useCallback((key) => littenSpecies.includes(key), [
    littenSpecies,
  ])

  const renderItem = useCallback(
    ({ item: { key, icon, label } }) => (
      <Pressable
        onPress={() => (isSelected(key) ? removeSpecies(key) : addSpecies(key))}
        style={styles.searchHeaderIcons}>
        <UIIcon
          IconComponent={icon}
          size="medium"
          selected={isSelected(key)}
          elevated
        />
        <UIText bold>{label}</UIText>
      </Pressable>
    ),
    [addSpecies, isSelected, removeSpecies],
  )

  return (
    <FlatList
      data={littenSpeciesList}
      renderItem={renderItem}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

const styles = StyleSheet.create({
  searchHeaderIcons: {
    width: 80,
    paddingTop: 4,
    alignItems: 'center',
  },
})

export default SearchHeaderResults
