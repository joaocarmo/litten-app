/**
 * @format
 * @flow
 */

import { useState } from 'react'
import ScreenTemplate from 'templates/screen'
import HomeSearchScreen from 'screens/home/search'
import HomeHeader from 'screens/home/header'
import HomeSearchHistory from 'screens/home/search-history'

const HomeIndexScreen: (args: any) => React$Node = (props) => {
  const [showSearchHistory, setShowSearchHistory] = useState(false)

  return (
    <ScreenTemplate
      header={
        <HomeHeader
          showSearchHistory={showSearchHistory}
          setShowSearchHistory={setShowSearchHistory}
        />
      }>
      <HomeSearchScreen />
      <HomeSearchHistory
        setShowSearchHistory={setShowSearchHistory}
        showSearchHistory={showSearchHistory}
      />
    </ScreenTemplate>
  )
}

export default HomeIndexScreen
