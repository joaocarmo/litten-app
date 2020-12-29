/**
 * @format
 * @flow
 */

import { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addFavouriteFilter as addFavouriteFilterAction } from 'store/actions/authenticated-user'
import { SearchSettingsActions } from 'store/actions/search-settings'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { UIListItem, UIPrompt } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  LITTEN_FILTER_SPECIES,
  LITTEN_FILTER_TYPE,
  LITTEN_FILTER_LOCATION_RADIUS,
  SCREEN_HOME_FILTER_SET,
} from 'utils/constants'
import {
  convertLength,
  getListItemLayout,
  getNumOfActiveFilters,
  getUnit,
} from 'utils/functions'
import { littenSpeciesList, littenTypes, littenFilters } from 'utils/litten'
import type { Dispatch, State } from 'store/types/state'
import type { SearchFilters } from 'store/types'

type OwnProps = {||}
type StateProps = {|
  +filters: SearchFilters,
  +useMetricUnits: boolean,
|}
type SearchActions = typeof SearchSettingsActions
type FavouriteFilterAction = typeof addFavouriteFilterAction
type DispatchProps = {|
  ...SearchActions,
  +addFavouriteFilter: FavouriteFilterAction,
|}
type FilterProps = {|
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
|}

const mapStateToProps = (state: State): StateProps => ({
  filters: state.searchSettings.filters,
  useMetricUnits: state.authenticatedUser.preferences.useMetricUnits,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    { ...SearchSettingsActions, addFavouriteFilter: addFavouriteFilterAction },
    dispatch,
  )

const HomeFilterScreen: (args: any) => React$Node = ({
  addFavouriteFilter,
  filters,
  resetFilters,
  useMetricUnits,
}) => {
  const [namePromptIsOpen, setNamePromptIsOpen] = useState(false)

  const navigation = useNavigation()

  const getFilterArray = (filter: string) => {
    if (filter === LITTEN_FILTER_SPECIES) {
      return littenSpeciesList
    } else if (filter === LITTEN_FILTER_TYPE) {
      return littenTypes
    }

    return []
  }

  const getCaptionFor = ({
    key,
    storeKey,
  }: {
    key: string,
    storeKey: string,
  }): string => {
    const filter: string[] | number = filters[storeKey]
    if (Array.isArray(filter) && filter.length) {
      return getFilterArray(key)
        .filter(({ key: k }) => filter.includes(k))
        .map(({ label }) => label)
        .join(', ')
        .trim()
    }

    const radius = +filter
    if (key === LITTEN_FILTER_LOCATION_RADIUS) {
      if (radius > 0) {
        return translate('screens.searches.filterLocationRadiusValueShort', {
          value: convertLength(radius || 0, useMetricUnits),
          unit: getUnit('length', useMetricUnits),
        })
      }
    }

    return ''
  }

  const clearConfirm = () => {
    Alert.alert(
      translate('cta.resetFilters'),
      translate('feedback.confirmMessages.resetFilters'),
      [
        {
          text: translate('cta.yes'),
          onPress: () => resetFilters(),
          style: 'destructive',
        },
        {
          text: translate('cta.no'),
          onPress: () => null,
        },
      ],
    )
  }

  const saveFilters = (name) => {
    addFavouriteFilter({
      key: name,
      ...filters,
    })

    setNamePromptIsOpen(false)
  }

  const saveFiltersWithName = () => {
    const numOfActiveFilters = getNumOfActiveFilters(filters)

    if (numOfActiveFilters > 0) {
      setNamePromptIsOpen(true)
    } else {
      Alert.alert(translate('screens.searches.noActiveFiltersToSave'))
    }
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

  const getItemLayout = useCallback(getListItemLayout, [])

  return (
    <>
      <UIPrompt
        open={namePromptIsOpen}
        title={translate('cta.enterFilterName')}
        message={translate('feedback.confirmMessages.enterFilterName')}
        cancelLabel={translate('cta.cancel')}
        onCancel={() => setNamePromptIsOpen(false)}
        confirmLabel={translate('cta.save')}
        onConfirm={saveFilters}
      />
      <FlatList
        data={littenFilters}
        renderItem={renderItem}
        ListFooterComponent={
          <>
            <UIListItem onPress={saveFiltersWithName}>
              {translate('screens.searches.saveFilters')}
            </UIListItem>
            <UIListItem onPress={clearConfirm}>
              {translate('screens.searches.filtersReset')}
            </UIListItem>
          </>
        }
        showsVerticalScrollIndicator={false}
        bounces={false}
        getItemLayout={getItemLayout}
      />
    </>
  )
}

export default connect<
  FilterProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeFilterScreen)
