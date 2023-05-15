import ScreenTemplate from '@templates/screen'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'
import FavouritePostsScreen from '@screens/favourites/posts'
import FavouriteFiltersScreen from '@screens/favourites/filters'
import { translate } from '@utils/i18n'
import { Routes } from '@utils/constants'

const tabs = [
  {
    key: Routes.SCREEN_TAB_NAV_FAVOURITES_POSTS,
    name: Routes.SCREEN_TAB_NAV_FAVOURITES_POSTS,
    title: translate('screens.favourites.tabNavPosts'),
    component: FavouritePostsScreen,
  },
  {
    key: Routes.SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    name: Routes.SCREEN_TAB_NAV_FAVOURITES_SEARCHES,
    title: translate('screens.favourites.tabNavFilters'),
    component: FavouriteFiltersScreen,
  },
]

const FavouritesScreen = () => (
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
