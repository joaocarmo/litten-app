/**
 * @format
 * @flow
 */

import { useState } from 'react'
import { connect } from 'react-redux'
import ScreenTemplate from 'templates/screen'
import HomeSearchScreen from 'screens/home/search'
import HomeHeader from 'screens/home/header'
import HomeSearchHistory from 'screens/home/search-history'
import type { Dispatch, State } from 'store/types/state'
import type { SearchSettings } from 'store/types'

type OwnProps = {}
type StateProps = {|
  +searchSettings: SearchSettings,
|}
type DispatchProps = null
type SearchProps = {
  ...OwnProps,
  ...StateProps,
  ...DispatchProps,
}

const mapStateToProps = (state: State): StateProps => ({
  searchSettings: state.searchSettings,
})

const mapDispatchToProps = null

const HomeIndexScreen: (args: any) => React$Node = (props) => {
  const [showSearchHistory, setShowSearchHistory] = useState(false)

  return (
    <ScreenTemplate
      header={
        <HomeHeader
          showSearchHistory={showSearchHistory}
          setShowSearchHistory={setShowSearchHistory}
          {...props}
        />
      }>
      <HomeSearchScreen {...props} />
      <HomeSearchHistory
        setShowSearchHistory={setShowSearchHistory}
        showSearchHistory={showSearchHistory}
      />
    </ScreenTemplate>
  )
}

export default connect<
  SearchProps,
  OwnProps,
  StateProps,
  DispatchProps,
  State,
  Dispatch,
>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeIndexScreen)
