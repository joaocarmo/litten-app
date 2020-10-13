/**
 * @format
 * @flow
 */

import React from 'react'
import { Keyboard, Pressable } from 'react-native'
import SearchResults from 'screens/home/search-results'
import { littens } from 'data/fake'

const HomeSearchScreen: (args: any) => React$Node = () => (
  <Pressable onPress={Keyboard.dismiss}>
    <SearchResults littens={littens} />
  </Pressable>
)

export default HomeSearchScreen
