/**
 * @format
 * @flow
 */

import React from 'react'
import { View } from 'react-native'
import { UIText } from 'ui-elements'
import { translate } from 'utils/i18n'

const HomeFilterScreen: () => React$Node = () => (
  <View>
    <UIText>{translate('screens.searches.filters')}</UIText>
  </View>
)

export default HomeFilterScreen
