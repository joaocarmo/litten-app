import { createRef } from 'react'
import { SCREEN_NOAUTH_WELCOME } from '@utils/constants'
import type {
  goBack as goBackType,
  navigate as navigateType,
  reset as resetType,
  setParams as setParamsType,
} from '@react-navigation/routers'

export const isReadyRef = createRef<boolean>()

type CommonActions = {
  goBack: goBackType
  navigate: navigateType
  reset: resetType
  setParams: setParamsType
}

export const navigationRef = createRef<CommonActions>()

export const navigate = (...args) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(...args)
  }
}

export const resetRoot = (resetState) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.resetRoot(resetState)
  }
}

export const resetToRoot = () => {
  resetRoot({
    index: 0,
    routes: [
      {
        name: SCREEN_NOAUTH_WELCOME,
      },
    ],
  })
}
