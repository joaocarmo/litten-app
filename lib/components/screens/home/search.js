/**
 * @format
 * @flow
 */

import React from 'react'
import SearchResults from 'screens/home/search-results'
import { littens } from 'data/fake'

const HomeSearchScreen: (args: any) => React$Node = () => (
  <SearchResults littens={littens} />
)

export default HomeSearchScreen
