/**
 * @format
 * @flow
 */

import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { UIIcon, UIText } from 'ui-elements'
import { littenSpeciesList } from 'utils/litten'

const SearchHeaderResults: (args: any) => React$Node = () => {
  const renderItem = ({ item: { icon, label } }) => (
    <View style={styles.searchHeaderIcon}>
      <UIIcon icon={icon} size="medium" elevated />
      <UIText bold>{label}</UIText>
    </View>
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
  searchHeaderIcon: {
    width: 80,
    alignItems: 'center',
  },
})

export default SearchHeaderResults
