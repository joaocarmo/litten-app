import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  UI_ELEMENT_BORDER_MARGIN,
  UI_ELEMENT_BORDER_RADIUS,
  UI_ELEMENT_LIST_HEIGHT,
  UI_ICON_SIZE_MINI,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const ICON_MARGIN = 16

const styles: ThemeFunction = ({ colors, typography }) => ({
  uiListItemCommon: {
    flex: 1,
    minHeight: UI_ELEMENT_LIST_HEIGHT,
    borderRadius: UI_ELEMENT_BORDER_RADIUS,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: UI_ELEMENT_BORDER_MARGIN,
    marginBottom: UI_ELEMENT_BORDER_MARGIN,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  uiListItemCommonSelected: {
    backgroundColor: colors.secondary,
  },
  uiListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uiListItemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uiListItemIconPressable: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    marginRight: -ICON_MARGIN,
  },
  uiListItemIcon: {
    maxHeight: UI_ICON_SIZE_MINI,
    maxWidth: UI_ICON_SIZE_MINI,
    marginRight: ICON_MARGIN,
  },
  uiListItemIconSelected: {
    tintColor: colors.textAlt,
  },
  uiListItemCommonPressed: {
    backgroundColor: colors.secondaryLighter,
  },
  uiListItemExtra: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uiListItemExtraBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    minWidth: 20,
    borderRadius: 8,
    padding: 4,
    marginRight: 4,
    backgroundColor: colors.neutralLight,
  },
  uiListItemExtraBadgeText: {
    color: colors.text,
    fontSize: typography.fontSize.xxsmall,
    fontWeight: typography.fontWeight.bolder,
  },
  uiListItemExtraBadgeTextActive: {
    color: colors.secondary,
  },
})

export default styles
