import { createRef } from 'react'

export const isReadyRef = createRef()

export const navigationRef = createRef()

export const navigate = (name, params) => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params)
  }
}
