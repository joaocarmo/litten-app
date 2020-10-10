/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import React from 'react'
import { FlatList } from 'react-native'
import { UIListItem, UISlider, UIText } from 'ui-elements'
import { convertLength, getUnit } from 'utils/functions'
import {
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_LOCATION_RADIUS_MIN,
  LITTEN_FILTER_LOCATION_RADIUS_MAX,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  filters: state.searchSettings.filters,
  useMetricUnits: state.authenticatedUser.preferences.useMetricUnits,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const HomeFilterSetScreen: (args: any) => React$Node = ({
  useMetricUnits,
  filter,
  filters: { littenSpecies, littenType, locationRadius },
  removeSpecies,
  removeType,
  setLocationRadius,
  setSpecies,
  setType,
  title,
}) => {
  const setValue = (value) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      setSpecies(value)
    } else if (filter === LITTEN_FILTER_TYPE) {
      setType(value)
    } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
      setLocationRadius(value)
    }
  }

  const unsetValue = (value) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      removeSpecies(value)
    } else if (filter === LITTEN_FILTER_TYPE) {
      removeType(value)
    }
  }

  const getValue = () => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpecies
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenType
    } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
      return locationRadius
    }
  }

  const getDisplayArr = () => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpeciesList
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenTypes
    }
    return null
  }

  const displayArr = getDisplayArr()
  const filterValue = getValue()
  const isSelected = (key) =>
    Array.isArray(filterValue) ? filterValue.includes(key) : false

  const renderItem = ({ item: { key, label, icon } }) => (
    <UIListItem
      selected={isSelected(key)}
      onPress={() => (isSelected(key) ? unsetValue(key) : setValue(key))}
      icon={icon}
      noFeedback>
      {label}
    </UIListItem>
  )

  return (
    <>
      {displayArr && (
        <FlatList
          data={displayArr}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
      {!displayArr && filter === LITTEN_FILTER_LOCATION_RADIUS && (
        <>
          <UIText>
            {translate('screens.searches.filterLocationRadiusValue', {
              value: convertLength(filterValue || 0, useMetricUnits),
              unit: getUnit('length', useMetricUnits),
            })}
          </UIText>
          <UISlider
            value={filterValue}
            onValueChange={setValue}
            step={1}
            minimumValue={LITTEN_FILTER_LOCATION_RADIUS_MIN}
            maximumValue={LITTEN_FILTER_LOCATION_RADIUS_MAX}
          />
        </>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterSetScreen)
