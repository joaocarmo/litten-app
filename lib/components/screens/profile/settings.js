/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { UISwitch, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const mapStateToProps = (state) => ({
  preferences: state.authenticatedUser.preferences,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileSettingsScreen: (args: any) => React$Node = ({
  preferences: { useMetricUnits, shareMetrics },
  setMetricUnits,
  setShareMetrics,
}) => (
  <>
    <UISwitch value={useMetricUnits} onValueChange={setMetricUnits}>
      {translate('screens.settings.useMetricUnits')}
    </UISwitch>
    <UISwitch value={shareMetrics} onValueChange={setShareMetrics}>
      {translate('screens.settings.shareMetrics')}
    </UISwitch>
    <UIText>{translate('screens.settings.shareMetricsDesc')}</UIText>
  </>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsScreen)
