/**
 * @format
 * @flow
 */

import React from 'react'
import { View } from 'react-native'
import { UIText } from 'ui-elements'

const LittenCard: (args: any) => React$Node = ({ litten }) => (
  <View>
    <UIText>{JSON.stringify(litten, null, 2)}</UIText>
  </View>
)

export default LittenCard
