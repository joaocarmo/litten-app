/**
 * @format
 * @flow
 */

import { FlatList, Pressable, StyleSheet } from 'react-native'
import { useSearchFiltersSpecies } from 'hooks'
import { UIIcon, UIText } from 'ui-elements'
import { littenSpeciesList } from 'utils/litten'

const SearchHeaderResults: (args: any) => React$Node = () => {
  const [littenSpecies, addSpecies, removeSpecies] = useSearchFiltersSpecies()

  const isSelected = (key) => littenSpecies.includes(key)

  const renderItem = ({ item: { key, icon, label } }) => (
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
    alignItems: 'center',
  },
})

export default SearchHeaderResults
