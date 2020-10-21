/**
 * @format
 * @flow
 */

import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Search from 'model/search'
import SearchResults from 'screens/home/search-results'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
  searchSettings: state.searchSettings,
})

const mapDispatchToProps = (dispatch) => ({})

const HomeSearchScreen: (args: any) => React$Node = ({
  authenticatedUser,
  searchSettings,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [littens, setLittens] = useState([])

  useEffect(() => {
    const subscriber = new Search({ ...searchSettings })
      .homeFeed()
      .onSnapshot((querySnapshot) => {
        const availableLittens = []

        querySnapshot.forEach((documentSnapshot) => {
          availableLittens.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          })
        })

        setLittens(availableLittens)
        setIsLoading(false)
      })

    // Unsubscribe from events when no longer in use
    return () => subscriber()
  }, [searchSettings])

  return (
    <SearchResults
      littens={littens}
      authenticatedUser={authenticatedUser}
      searchSettings={searchSettings}
      isLoading={isLoading}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchScreen)
