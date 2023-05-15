import { createStackNavigator } from '@react-navigation/stack'
import ScreenTemplate from '@templates/screen'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'
import Home from '@screens/home/main'
import Filter from '@screens/home/filter'
import FilterSet from '@screens/home/filter/set'
import { translate } from '@utils/i18n'
import { Routes } from '@utils/constants'
import type { HomeStackParamList } from '@utils/types/routes'

const HomeStack = createStackNavigator<HomeStackParamList>()

const HomeFilter = (props) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {translate('screens.searches.filters')}
      </ScreenSimpleHeaderTemplate>
    }
  >
    <Filter {...props} />
  </ScreenTemplate>
)

const HomeFilterSet = ({ route }) => (
  <ScreenTemplate
    header={
      <ScreenSimpleHeaderTemplate withGoBack>
        {route?.params?.title}
      </ScreenSimpleHeaderTemplate>
    }
  >
    <FilterSet filter={route?.params?.filter} />
  </ScreenTemplate>
)

const HomeScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name={Routes.SCREEN_HOME_INDEX} component={Home} />
    <HomeStack.Screen name={Routes.SCREEN_HOME_FILTER} component={HomeFilter} />
    <HomeStack.Screen
      name={Routes.SCREEN_HOME_FILTER_SET}
      component={HomeFilterSet}
    />
  </HomeStack.Navigator>
)

export default HomeScreen
