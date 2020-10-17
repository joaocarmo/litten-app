/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { UIListItem } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_LOCATION_RADIUS,
  SCREEN_HOME_FILTER_SET,
} from 'utils/constants'
import { convertLength, getUnit } from 'utils/functions'
import { littenSpeciesList, littenTypes, littenFilters } from 'utils/litten'

const mapStateToProps = (state) => ({
  filters: state.searchSettings.filters,
  useMetricUnits: state.authenticatedUser.preferences.useMetricUnits,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const HomeFilterScreen: (args: any) => React$Node = ({
  clearFilters,
  filters,
  useMetricUnits,
}) => {
  const navigation = useNavigation()

  const getFilterArray = (filter) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpeciesList
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenTypes
    }

    return []
  }

  const getCaptionFor = ({ key, storeKey }) => {
    const filter = filters[storeKey]
    if (filter) {
      if (Array.isArray(filter) && filter.length) {
        return getFilterArray(key)
          .filter(({ key: k }) => filter.includes(k))
          .map(({ label }) => label)
          .join(', ')
          .trim()
      }

      if (key === LITTEN_FILTER_LOCATION_RADIUS && Number.isInteger(filter)) {
        return translate('screens.searches.filterLocationRadiusValueShort', {
          value: convertLength(filter || 0, useMetricUnits),
          unit: getUnit('length', useMetricUnits),
        })
      }
    }

    return ''
  }

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

  const renderItem = ({ item: { key, label, storeKey } }) => (
    <UIListItem
      onPress={() =>
        navigation.navigate(SCREEN_HOME_FILTER_SET, {
          title: label,
          filter: key,
        })
      }
      caption={getCaptionFor({ key, storeKey })}
      hasExtra>
      {label}
    </UIListItem>
  )

  return (
    <FlatList
      data={littenFilters}
      renderItem={renderItem}
      ListFooterComponent={
        <UIListItem onPress={clearConfirm}>
          {translate('screens.searches.filtersClear')}
        </UIListItem>
      }
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterScreen)
