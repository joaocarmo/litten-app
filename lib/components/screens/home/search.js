/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import SearchResults from 'screens/home/search-results'
import { littens } from 'data/fake'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
  searchSettings: state.searchSettings,
})

const mapDispatchToProps = (dispatch) => ({})

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
}) => (
  <SearchResults
    littens={littens}
    authenticatedUser={authenticatedUser}
    searchSettings={searchSettings}
  />
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchScreen)
