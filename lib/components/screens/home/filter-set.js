/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as SearchSettings from 'store/actions/search-settings'
import React from 'react'
import { View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  filters: state.searchSettings.filters,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(SearchSettings, dispatch)

const HomeFilterSetScreen: () => React$Node = ({
  filters: { littenSpecies, littenType, locationRadius },
  filter,
}) => (
  <View>
    <UIText>{translate(`screens.searches.${filter}`)}</UIText>
    <UIText>{littenSpecies}</UIText>
    <UIText>{littenType}</UIText>
    <UIText>{locationRadius}</UIText>
  </View>
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilterSetScreen)
