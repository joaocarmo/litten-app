/**
 * @format
 * @flow
 */

import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import SearchResults from 'screens/home/search-results'
import { littens } from 'data/fake'

const HomeSearchScreen: (args: any) => React$Node = () => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SearchResults littens={littens} />
  </TouchableWithoutFeedback>
)

export default HomeSearchScreen
