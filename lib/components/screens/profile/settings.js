/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import React from 'react'
import { UISwitch } from 'ui-elements'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  preferences: state.authenticatedUser.preferences,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileSettingsScreen: (args: any) => React$Node = ({
  preferences: { useMetricUnits },
  setMetricUnits,
}) => (
  <>
    <UISwitch value={useMetricUnits} onValueChange={setMetricUnits}>
      {translate('screens.settings.useMetricUnits')}
    </UISwitch>
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsScreen)
