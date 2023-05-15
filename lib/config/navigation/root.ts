import { createNavigationContainerRef } from '@react-navigation/native'
import { Routes } from '@utils/constants'

export const navigationRef = createNavigationContainerRef()

type NavigateParameters = Parameters<typeof navigationRef.navigate>

export const navigate = (...args: NavigateParameters) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args)
  }
}

type ResetRootParameters = Parameters<typeof navigationRef.reset>

export const resetRoot: typeof navigationRef.resetRoot = (
  ...args: ResetRootParameters
) => {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(...args)
  }
}

export const resetToRoot = () => {
  resetRoot({
    index: 0,
    routes: [
      {
        name: Routes.SCREEN_NOAUTH_WELCOME,
      },
    ],
  })
}
