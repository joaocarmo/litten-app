/**
 * @format
 * @flow
 */

import { useCallback, useMemo, useState } from 'react'
import type { Node } from 'react'
import { useDispatch } from 'react-redux'
import {
  usePaddingBottom,
  useSearchFilters,
  useSearchFiltersSpecies,
  useUnit,
} from 'hooks'
import {
  removeType as removeTypeAction,
  setLocationRadius as setLocationRadiusAction,
  setType as setTypeAction,
  setUserType as setUserTypeAction,
} from 'store/actions/search-settings'
import { FlatList } from 'react-native'
import { UIListItem, UIOption, UISlider, UISwitch } from 'ui-elements'
import { convertLength, getListItemLayout } from 'utils/functions'
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
import { contentContainerStyle } from 'styles/common'
import { translate } from 'utils/i18n'

const HomeFilterSetScreen: (args: any) => Node = ({ filter, title }) => {
  const dispatch = useDispatch()

  const [{ littenType, locationRadius, userType }] = useSearchFilters()
  const [littenSpecies, setSpecies, removeSpecies] = useSearchFiltersSpecies()

  const [radiusFilter, setRadiusFilter] = useState(locationRadius)
  const [useRadiusFilter, setUseRadiusFilter] = useState(locationRadius > 0)

  const [radiusUnit, useMetricUnits] = useUnit('length')

  const withPaddingBottom = usePaddingBottom()

  const removeType = useCallback(
    (type) => dispatch(removeTypeAction(type)),
    [dispatch],
  )

  const setLocationRadius = useCallback(
    (radius) => dispatch(setLocationRadiusAction(radius)),
    [dispatch],
  )

  const setType = useCallback(
    (type) => dispatch(setTypeAction(type)),
    [dispatch],
  )

  const setUserType = useCallback(
    (newUserType) => dispatch(setUserTypeAction(newUserType)),
    [dispatch],
  )

  const setValue = useCallback(
    (value) => {
      if (filter === LITTEN_FILTER_SPECIES && typeof value === 'string') {
        setSpecies(value)
      } else if (filter === LITTEN_FILTER_TYPE && typeof value === 'string') {
        setType(value)
      } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
        setLocationRadius(+value)
        setRadiusFilter(+value)
      } else if (
        filter === LITTEN_FILTER_USER_TYPE &&
        typeof value === 'string'
      ) {
        setUserType(value)
      }
    },
    [filter, setLocationRadius, setSpecies, setType, setUserType],
  )

  const unsetValue = useCallback(
    (value) => {
      if (filter === LITTEN_FILTER_SPECIES) {
        removeSpecies(value)
      } else if (filter === LITTEN_FILTER_TYPE) {
        removeType(value)
      }
    },
    [filter, removeSpecies, removeType],
  )

  const getValue = useCallback(() => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpecies
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenType
    } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
      return locationRadius
    } else if (filter === LITTEN_FILTER_USER_TYPE) {
      return userType
    }
  }, [filter, littenSpecies, littenType, locationRadius, userType])

  const getDisplayArr = () => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpeciesList
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenTypes
    }
    return null
  }

  const handleToggleRadiusFilter = useCallback(
    (value) => {
      if (value) {
        setValue(0)
        setUseRadiusFilter(false)
      } else {
        setValue(LITTEN_FILTER_LOCATION_RADIUS_DEFAULT)
        setUseRadiusFilter(true)
      }
    },
    [setValue],
  )

  const displayArr = getDisplayArr()
  const filterValue = getValue()
  const isSelected = (key) =>
    Array.isArray(filterValue) ? filterValue.includes(key) : false
  const radiusValue = convertLength(radiusFilter, useMetricUnits)

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

  const radiusDescription = useMemo(
    () =>
      radiusFilter > 0
        ? translate('screens.searches.filterLocationRadiusValue', {
            value: radiusValue,
            unit: radiusUnit,
          })
        : translate('screens.searches.noFilterLocationRadiusValue'),
    [radiusFilter, radiusUnit, radiusValue],
  )

  const renderLocationFilter = useCallback(
    () => (
      <>
        <UISwitch
          label={translate('screens.searches.searchEverywhere')}
          description={radiusDescription}
          onValueChange={handleToggleRadiusFilter}
          value={!useRadiusFilter}
        />
        {useRadiusFilter && (
          <UISlider
            value={filterValue}
            onValueChange={setRadiusFilter}
            onSlidingComplete={setValue}
            step={1}
            minimumValue={LITTEN_FILTER_LOCATION_RADIUS_MIN}
            maximumValue={LITTEN_FILTER_LOCATION_RADIUS_MAX}
          />
        )}
      </>
    ),
    [
      filterValue,
      handleToggleRadiusFilter,
      radiusDescription,
      setValue,
      useRadiusFilter,
    ],
  )

  const renderUserTypeFilter = useCallback(
    () => (
      <UIOption
        items={userTypes}
        label={translate('screens.searches.selectUserType')}
        description={translate('screens.searches.selectUserTypeDesc')}
        onValueChange={setValue}
        selectedValue={filterValue}
      />
    ),
    [filterValue, setValue],
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
          contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
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

export default HomeFilterSetScreen
