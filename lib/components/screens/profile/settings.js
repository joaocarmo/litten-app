/**
 * @format
 * @flow
 */

import React from 'react'
import { View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const ProfileSettingsScreen: () => React$Node = () => (
  <View>
    <UIText>{translate('screens.profile.settings')}</UIText>
  </View>
)

export default ProfileSettingsScreen
