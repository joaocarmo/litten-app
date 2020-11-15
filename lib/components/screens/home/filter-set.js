/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SearchSettingsActions } from 'store/actions/search-settings'
import { FlatList } from 'react-native'
import { UIListItem, UISlider, UISwitch, UIText } from 'ui-elements'
import { convertLength, getUnit } from 'utils/functions'
import {
  LITTEN_FILTER_LOCATION_RADIUS_DEFAULT,
  LITTEN_FILTER_LOCATION_RADIUS_MAX,
  LITTEN_FILTER_LOCATION_RADIUS_MIN,
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  filters: state.searchSettings.filters,
  useMetricUnits: state.authenticatedUser.preferences.useMetricUnits,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettingsActions, dispatch)

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
  const [radiusFilter, setRadiusFilter] = useState(locationRadius)
  const [useRadiusFilter, setUseRadiusFilter] = useState(locationRadius > 0)

  const setValue = (value) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      setSpecies(value)
    } else if (filter === LITTEN_FILTER_TYPE) {
      setType(value)
    } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
      setLocationRadius(value)
      setRadiusFilter(+value)
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

  const handleToggleRadiusFilter = (value) => {
    if (value) {
      setValue(0)
      setUseRadiusFilter(false)
    } else {
      setValue(LITTEN_FILTER_LOCATION_RADIUS_DEFAULT)
      setUseRadiusFilter(true)
    }
  }

  const displayArr = getDisplayArr()
  const filterValue = getValue()
  const isSelected = (key) =>
    Array.isArray(filterValue) ? filterValue.includes(key) : false
  const radiusValue = convertLength(radiusFilter, useMetricUnits)
  const radiusUnit = getUnit('length', useMetricUnits)

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
          bounces={false}
        />
      )}
      {!displayArr && filter === LITTEN_FILTER_LOCATION_RADIUS && (
        <>
          {radiusFilter > 0 && (
            <UIText>
              {translate('screens.searches.filterLocationRadiusValue', {
                value: radiusValue,
                unit: radiusUnit,
              })}
            </UIText>
          )}
          {!radiusFilter && (
            <UIText>
              {translate('screens.searches.noFilterLocationRadiusValue')}
            </UIText>
          )}
          <UISlider
            value={filterValue}
            onValueChange={setRadiusFilter}
            onSlidingComplete={setValue}
            step={1}
            minimumValue={LITTEN_FILTER_LOCATION_RADIUS_MIN}
            maximumValue={LITTEN_FILTER_LOCATION_RADIUS_MAX}
            disabled={!useRadiusFilter}
          />
          <UISwitch
            value={!useRadiusFilter}
            onValueChange={handleToggleRadiusFilter}>
            {translate('screens.searches.searchEverywhere')}
          </UISwitch>
        </>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterSetScreen)
