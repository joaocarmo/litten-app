/**
 * @format
 * @flow
 */

import React from 'react'
import { View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const ProfileReportScreen: () => React$Node = ({ type }) => (
  <View>
    <UIText>{translate('screens.profile.contactUs')}</UIText>
    <UIText>{type}</UIText>
  </View>
)

export default ProfileReportScreen
