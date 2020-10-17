/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import { FlatList, Pressable, StyleSheet } from 'react-native'
import { UIIcon, UIText } from 'ui-elements'
import { littenSpeciesList } from 'utils/litten'

const mapStateToProps = (state) => ({
  littenSpecies: state.searchSettings.filters.littenSpecies,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const SearchHeaderResults: (args: any) => React$Node = ({
  littenSpecies,
  removeSpecies,
  setSpecies,
}) => {
  const isSelected = (key) => littenSpecies.includes(key)

  const renderItem = ({ item: { key, icon, label } }) => (
    <Pressable
      onPress={() => (isSelected(key) ? removeSpecies(key) : setSpecies(key))}
      style={styles.searchHeaderIcons}>
      <UIIcon icon={icon} size="medium" selected={isSelected(key)} elevated />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeaderResults)
