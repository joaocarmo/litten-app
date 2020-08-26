/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import React from 'react'
import { UIListItem, UIText } from 'ui-elements'
import {
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_LOCATION_RADIUS,
} from 'utils/constants'
import { littenSpeciesList, littenTypes } from 'utils/litten'

const mapStateToProps = (state) => ({
  filters: state.searchSettings.filters,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const HomeFilterSetScreen: () => React$Node = ({
  filters: { littenSpecies, littenType, locationRadius },
  filter,
  title,
  setLocation,
  setSpecies,
  setType,
}) => {
  const setValue = (value) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      setSpecies(value)
    } else if (filter === LITTEN_FILTER_TYPE) {
      setType(value)
    } else if (filter === LITTEN_FILTER_LOCATION_RADIUS) {
      setLocation(value)
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

  return (
    <>
      {displayArr &&
        displayArr.map(({ key, label }) => (
          <UIListItem
            selected={key === getValue()}
            onPress={() => setValue(key)}
            key={key}>
            {label}
          </UIListItem>
        ))}
      {!displayArr && filter === LITTEN_FILTER_LOCATION_RADIUS && (
        <UIText>Find littens within 5km of me</UIText>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterSetScreen)
