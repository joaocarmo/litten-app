import { useEffect } from 'react'
import { useNavigation, useNavigationState } from '@react-navigation/native'
import { Routes } from '@utils/constants'
import linkingConfig from '@config/navigation/linking'
import type {
  RoutesScreenName,
  UseSafeNavigationProp,
} from '@utils/types/routes'

type UseSafeNavigationParams = {
  fallbackScreen?: RoutesScreenName
}

const useSafeNavigation = (
  { fallbackScreen }: UseSafeNavigationParams = {
    fallbackScreen: Routes.SCREEN_TAB_NAV_HOME,
  },
) => {
  const navIndex = useNavigationState(({ index }) => index)
  const navRoutes = useNavigationState(({ routes }) => routes)
  const navigation = useNavigation<UseSafeNavigationProp>()

  const canGoBack = navIndex > 0

  useEffect(() => {
    // Make sure there's a screen to go back to after following a deep link
    const [currentRoute] = navRoutes
    const linkingRoutes = Object.keys(linkingConfig.config.screens)

    if (!canGoBack && linkingRoutes.includes(currentRoute.name)) {
      const routes = [
        {
          key: fallbackScreen,
          name: fallbackScreen,
        },
        {
          key: currentRoute.name,
          name: currentRoute.name,
          params: currentRoute.params,
        },
      ]

      navigation.reset({
        index: 1,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore FIXME
        routes,
      })
    }
  }, [canGoBack, fallbackScreen, navRoutes, navigation])

  return navigation
}

export default useSafeNavigation
