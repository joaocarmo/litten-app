import { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  STRUCTURE_PADDING_EXTRA,
  STRUCTURE_TAB_NAV_HEIGHT,
} from '@utils/constants'

const usePaddingBottom = (multiplier = 1) => {
  const { bottom } = useSafeAreaInsets()

  const paddingBottom = useMemo(
    () =>
      (STRUCTURE_TAB_NAV_HEIGHT + Math.max(bottom, STRUCTURE_PADDING_EXTRA)) *
      multiplier,
    [bottom, multiplier],
  )

  return {
    insetBottom: bottom,
    paddingBottom,
  }
}

export default usePaddingBottom
