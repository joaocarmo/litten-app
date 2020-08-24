/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert, View } from 'react-native'
import { UIListItem } from 'ui-elements'
import { translate } from 'utils/i18n'
import { SCREEN_HOME_FILTER_SET } from 'utils/constants'

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const HomeFilterScreen: () => React$Node = ({ clearFilters }) => {
  const navigation = useNavigation()

  const clearConfirm = () => {
    Alert.alert(
      translate('cta.clearFilters'),
      translate('feedback.confirmMessages.clearFilters'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => clearFilters(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
        { cancelable: false },
      ],
    )
  }

  return (
    <View>
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_HOME_FILTER_SET, {
            title: translate('screens.searches.filterSpecies'),
            filter: 'filterSpecies',
          })
        }
        hasExtra>
        {translate('screens.searches.filterSpecies')}
      </UIListItem>
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_HOME_FILTER_SET, {
            title: translate('screens.searches.filterType'),
            filter: 'filterType',
          })
        }
        hasExtra>
        {translate('screens.searches.filterType')}
      </UIListItem>
      <UIListItem
        onPress={() =>
          navigation.navigate(SCREEN_HOME_FILTER_SET, {
            title: translate('screens.searches.filterLocation'),
            filter: 'filterLocation',
          })
        }
        hasExtra>
        {translate('screens.searches.filterLocation')}
      </UIListItem>
      <UIListItem onPress={clearConfirm}>
        {translate('screens.searches.filtersClear')}
      </UIListItem>
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterScreen)
