import { useEffect } from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { SCREEN_TAB_NAV_HOME } from '@utils/constants'
import linkingConfig from '@config/navigation/linking'

type UseSafeNavigationParams = {
  fallbackScreen?: string
}

const useSafeNavigation = (
  { fallbackScreen }: UseSafeNavigationParams = {
    fallbackScreen: SCREEN_TAB_NAV_HOME,
  },
) => {
  const navIndex = useNavigationState(({ index }) => index)
  const navRoutes = useNavigationState(({ routes }) => routes)
  const navigation = useNavigation()

  const canGoBack = navIndex > 0

  useEffect(() => {
    // Make sure there's a screen to go back to after following a deep link
    const [currentRoute] = navRoutes
    const linkingRoutes = Object.keys(linkingConfig.config.screens)

    if (!canGoBack && linkingRoutes.includes(currentRoute.name)) {
      const routes = [
        {
          name: fallbackScreen,
        },
        {
          name: currentRoute.name,
          params: currentRoute.params,
        },
      ] as const

      navigation.reset({
        index: 1,
        routes,
      })
    }
  }, [canGoBack, fallbackScreen, navRoutes, navigation])

  return navigation
}

export default useSafeNavigation
