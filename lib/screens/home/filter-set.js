/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SearchSettingsActions } from 'store/actions/search-settings'
import { FlatList } from 'react-native'
import { UIListItem, UIOption, UISlider, UISwitch, UIText } from 'ui-elements'
import { convertLength, getListItemLayout, getUnit } from 'utils/functions'
import {
  LITTEN_FILTER_LOCATION_RADIUS_DEFAULT,
  LITTEN_FILTER_LOCATION_RADIUS_MAX,
  LITTEN_FILTER_LOCATION_RADIUS_MIN,
  LITTEN_FILTER_LOCATION_RADIUS,
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_USER_TYPE,
} from 'utils/constants'
import { littenSpeciesList, littenTypes, userTypes } from 'utils/litten'
import { translate } from 'utils/i18n'
import type { Dispatch, State } from 'store/types/state'
import type { SearchFilters } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +filters: SearchFilters,
  +useMetricUnits: boolean,
|}
type SearchActions = typeof SearchSettingsActions
type DispatchProps = {|
  ...SearchActions,
|}
type FilterSetProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  filters: state.searchSettings.filters,
  useMetricUnits: state.authenticatedUser.preferences.useMetricUnits,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(SearchSettingsActions, dispatch)

const HomeFilterSetScreen: (args: any) => React$Node = ({
  filter,
  filters: { littenSpecies, littenType, locationRadius, userType },
  removeSpecies,
  removeType,
  setLocationRadius,
  setSpecies,
  setType,
  setUserType,
  title,
  useMetricUnits,
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
    } else if (filter === LITTEN_FILTER_USER_TYPE) {
      setUserType(value)
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
    } else if (filter === LITTEN_FILTER_USER_TYPE) {
      return userType
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
      IconComponent={icon}
      noFeedback>
      {label}
    </UIListItem>
  )

  const getItemLayout = useCallback(getListItemLayout, [])

  const renderLocationFilter = () => (
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
        label={translate('screens.searches.searchEverywhere')}
        onValueChange={handleToggleRadiusFilter}
        value={!useRadiusFilter}
      />
    </>
  )

  const renderUserTypeFilter = () => (
    <UIOption
      items={userTypes}
      label={translate('screens.searches.selectUserType')}
      onValueChange={setValue}
      selectedValue={filterValue}
    />
  )

  return (
    <>
      {displayArr && (
        <FlatList
          data={displayArr}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          getItemLayout={getItemLayout}
        />
      )}
      {!displayArr &&
        filter === LITTEN_FILTER_LOCATION_RADIUS &&
        renderLocationFilter()}
      {!displayArr &&
        filter === LITTEN_FILTER_USER_TYPE &&
        renderUserTypeFilter()}
    </>
  )
}

export default connect<
  FilterSetProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeFilterSetScreen)
