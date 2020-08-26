/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { UIListItem } from 'ui-elements'
import { translate } from 'utils/i18n'
import { SCREEN_HOME_FILTER_SET } from 'utils/constants'
import { littenFilters } from 'utils/litten'

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
    <>
      {littenFilters.map(({ key, label }) => (
        <UIListItem
          onPress={() =>
            navigation.navigate(SCREEN_HOME_FILTER_SET, {
              title: label,
              filter: key,
            })
          }
          hasExtra
          key={key}>
          {label}
        </UIListItem>
      ))}
      <UIListItem onPress={clearConfirm}>
        {translate('screens.searches.filtersClear')}
      </UIListItem>
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterScreen)
