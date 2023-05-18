import { vh, vw } from 'react-native-expo-viewport-units'
import {
  STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO,
  STRUCTURE_PADDING_MULTIPLIER,
  STRUCTURE_TAB_NAV_BORDER_RADIUS,
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
} from '@utils/constants'
import type { ThemeFunction } from '@styles/types'

const styles: ThemeFunction = ({ colors }) => ({
  littenPostContainer: {
    flex: 1,
    backgroundColor: colors.neutralLight,
  },
  littenPost: {
    flex: 1,
  },
  bulletContainerStyle: {
    bottom: vh(6),
  },
  mainImages: {
    width: '100%',
    height: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100) * 1.1,
    position: 'absolute',
    top: 0,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100) * 1.1,
  },
  mainImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondaryLight,
  },
  littenPostContent: {
    minHeight: vh((1 - STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO) * 100),
    marginTop: vh(STRUCTURE_LITTEN_POST_IMAGE_TO_CONTENT_RATIO * 100),
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT * STRUCTURE_PADDING_MULTIPLIER,
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    backgroundColor: colors.neutralLight,
    padding: vw(6),
  },
  littenPostContentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  littenPostTitle: {
    flexShrink: 1,
    marginRight: 6,
  },
  littenPostContentSubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  littenPostContentSubHeaderIcon: {
    marginRight: 8,
  },
  littenPostContentHeaderLocation: {
    flexShrink: 1,
  },
  littenPostFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    height: STRUCTURE_TAB_NAV_HEIGHT,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TAB_NAV_BORDER_RADIUS,
    backgroundColor: colors.background,
    zIndex: 1,
  },
  littenPostFooterUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  littenPostFooterUserInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 24,
  },
  littenPostFooterUserName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameOrganizationIcon: {
    marginLeft: 6,
  },
  callOptionsContainer: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  favIconStyle: {
    tintColor: colors.danger,
  },
})

export default styles
