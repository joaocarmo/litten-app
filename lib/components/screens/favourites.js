/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FavouritePostsScreen from 'screens/favourites/posts'
import FavouriteSearchesScreen from 'screens/favourites/searches'
import { translate } from 'utils/i18n'
import {
  SCREEN_TAB_NAV_FAVOURITES_POSTS,
  SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
} from 'utils/constants'

const userPosts = 0

const userSearches = 0

const tabs = [
  {
    key: SCREEN_TAB_NAV_FAVOURITES_POSTS,
    name: SCREEN_TAB_NAV_FAVOURITES_POSTS,
    title: translate('screens.favourites.tabNavPosts'),
    component: FavouritePostsScreen,
    scrollable: userPosts > 0,
  },
  {
    key: SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    name: SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    title: translate('screens.favourites.tabNavSearches'),
    component: FavouriteSearchesScreen,
    scrollable: userSearches > 0,
  },
]

const FavouritesScreen: () => React$Node = () => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate>
        {translate('screens.favourites.title')}
      </ScreenSimpleHeaderTemplate>
    }
    tabs={tabs}
  />
)

export default FavouritesScreen
