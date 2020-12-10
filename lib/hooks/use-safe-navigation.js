/**
 * @format
 * @flow
 */

import { useEffect } from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { SCREEN_TAB_NAV_HOME } from 'utils/constants'

const useSafeNavigation = ({
  fallbackScreen = SCREEN_TAB_NAV_HOME,
}: {
  fallbackScreen: string,
} = {}) => {
  const navIndex = useNavigationState(({ index }) => index)
  const navRoutes = useNavigationState(({ routes }) => routes)

  const navigation = useNavigation()

  const canGoBack = navIndex > 0

  useEffect(() => {
    const [currentRoute] = navRoutes
    if (!canGoBack && currentRoute.name !== SCREEN_TAB_NAV_HOME) {
      const routes = [
        { name: fallbackScreen },
        { name: currentRoute.name, params: currentRoute.params },
      ]
      navigation.reset({
        index: 1,
        routes,
      })
    }
  }, [canGoBack, fallbackScreen, navRoutes, navigation])

  return navigation
}

export default useSafeNavigation
