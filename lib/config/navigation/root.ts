import { createRef } from 'react'
import { SCREEN_NOAUTH_WELCOME } from '@utils/constants'

export const isReadyRef = createRef()
export const navigationRef = createRef()
export const navigate = (name, params) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params)
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
