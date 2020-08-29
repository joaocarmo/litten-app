/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import React from 'react'
import { UIHeader, UISelect } from 'ui-elements'
import { translate } from 'utils/i18n'
import { MEASURE_KM, MEASURE_MI } from 'utils/constants'

const unitsOfLength = [
  { key: MEASURE_KM, label: MEASURE_KM, value: MEASURE_KM },
  { key: MEASURE_MI, label: MEASURE_MI, value: MEASURE_MI },
]

const mapStateToProps = (state) => ({
  preferences: state.authenticatedUser.preferences,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileSettingsScreen: (args: any) => React$Node = ({
  preferences: { distanceUnit },
  setDistanceUnit,
}) => (
  <>
    <UIHeader>{translate('screens.settings.unitOfLength')}</UIHeader>
    <UISelect
      items={unitsOfLength}
      selectedValue={distanceUnit}
      onValueChange={setDistanceUnit}
    />
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsScreen)
