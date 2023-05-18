import {
  UI_ICON_SIZE_MEDIUM,
  UI_ICON_SIZE_SMALL,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors }) => ({
  uiIconContainer: {
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: colors.background,
  },
  uiIconContainerMainSelected: {
    backgroundColor: colors.secondary,
  },
  uiIconContainerMainMedium: {
    height: UI_ICON_SIZE_MEDIUM,
    padding: UI_ICON_SIZE_MEDIUM / 4,
  },
  uiIconContainerCircleMedium: {
    borderRadius: UI_ICON_SIZE_MEDIUM / 2,
  },
  uiIconContainerMainSmall: {
    height: UI_ICON_SIZE_SMALL,
    padding: UI_ICON_SIZE_SMALL / 4,
  },
  uiIconContainerCircleSmall: {
    borderRadius: UI_ICON_SIZE_SMALL / 2,
  },
  uiIconContainerMainMini: {
    height: UI_ICON_SIZE_MINI,
    padding: UI_ICON_SIZE_MINI / 4,
  },
  uiIconContainerCircleMini: {
    borderRadius: UI_ICON_SIZE_MINI / 2,
  },
  uiIcon: {
    height: '100%',
    width: '100%',
    tintColor: colors.secondary,
  },
  uiIconSelected: {
    tintColor: colors.background,
  },
})

export default styles
