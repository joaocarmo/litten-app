/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import SearchResults from 'screens/home/search-results'
import { littens } from 'data/fake'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) => ({})

const HomeSearchScreen: (args: any) => React$Node = ({ authenticatedUser }) => (
  <SearchResults littens={littens} authenticatedUser={authenticatedUser} />
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchScreen)
