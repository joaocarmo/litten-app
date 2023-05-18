import {
  UI_ICON_SIZE_MICRO,
  UI_ICON_SIZE_MINI,
  UI_LITTEN_CARD_BORDER_RADIUS,
  UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO,
  UI_LITTEN_CARD_HEIGHT,
  UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO,
  UI_LITTEN_CARD_SPACING,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const UI_ICON_MARGIN = 8
const UI_ICON_SIZE_MICRO_MINI_AVG = (UI_ICON_SIZE_MICRO + UI_ICON_SIZE_MINI) / 2

const styles: ThemeFunction = ({ colors }) => ({
  cardContainer: {
    height: UI_LITTEN_CARD_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    paddingTop: UI_LITTEN_CARD_SPACING / 2,
    paddingBottom: UI_LITTEN_CARD_SPACING / 2,
    paddingLeft: UI_LITTEN_CARD_SPACING / 3,
    paddingRight: UI_LITTEN_CARD_SPACING / 3,
  },
  cardImageContainer: {
    height: '100%',
    width: `${UI_LITTEN_CARD_IMAGE_TO_CONTENT_RATIO * 100}%`,
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    backgroundColor: colors.neutral,
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    borderRadius: UI_LITTEN_CARD_BORDER_RADIUS,
  },
  cardImagePlaceholder: {
    backgroundColor: colors.secondaryLight,
  },
  cardContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContent: {
    justifyContent: 'space-between',
    height: `${UI_LITTEN_CARD_CONTENT_TO_CONTAINER_RATIO * 100}%`,
    padding: 12,
    paddingLeft: 18,
    backgroundColor: colors.background,
    borderTopRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
    borderBottomRightRadius: UI_LITTEN_CARD_BORDER_RADIUS,
  },
  cardContentTitle: {
    flexShrink: 1,
  },
  cardContentHeaderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContentSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContentSubHeaderIcon: {
    marginRight: UI_ICON_MARGIN,
  },
  cardContentMain: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cardContentFooterAction: {
    backgroundColor: colors.neutralLight,
    shadowOpacity: 0.08,
    marginLeft: 14,
    marginRight: UI_ICON_MARGIN - UI_ICON_SIZE_MICRO_MINI_AVG / 4,
  },
  cardContentFooterActionIcon: {
    tintColor: colors.text,
  },
  cardContentFooterUserInfo: {
    flex: 1,
    paddingRight: 12,
    justifyContent: 'center',
  },
  cardContentFooterUserName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameOrganizationIcon: {
    marginLeft: 6,
  },
})

export default styles
