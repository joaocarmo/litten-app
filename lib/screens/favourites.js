/**
 * @format
 * @flow
 */

import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import FavouritePostsScreen from 'screens/favourites/posts'
import FavouriteFiltersScreen from 'screens/favourites/filters'
import { translate } from 'utils/i18n'
import {
  SCREEN_TAB_NAV_FAVOURITES_POSTS,
  SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
} from 'utils/constants'

const tabs = [
  {
    key: SCREEN_TAB_NAV_FAVOURITES_POSTS,
    name: SCREEN_TAB_NAV_FAVOURITES_POSTS,
    title: translate('screens.favourites.tabNavPosts'),
    component: FavouritePostsScreen,
  },
  {
    key: SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    name: SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    title: translate('screens.favourites.tabNavFilters'),
    component: FavouriteFiltersScreen,
  },
]

const FavouritesScreen: (args: any) => React$Node = () => (
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
