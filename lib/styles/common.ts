import { StyleSheet } from 'react-native'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
  UI_ELEMENT_BORDER_MARGIN,
} from '@utils/constants'

export const commonStyles = (theme) => ({
  elevated: {
    shadowColor: theme.colors.backgroundAlt,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 6,
  },
  cardElevated: {
    shadowColor: theme.colors.backgroundAlt,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
  },
  veryElevated: {
    shadowColor: theme.colors.backgroundAlt,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
  flexOne: {
    flex: 1,
  },
  topPadding: {
    paddingTop: UI_ELEMENT_BORDER_MARGIN,
  },
})

export const noAuthFormStyles = () => ({
  formContainer: {
    flex: 1,
  },
  formProgress: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFields: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formActions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 40,
  },
  forgotPassword: {
    alignSelf: 'center',
    textDecorationLine: 'none',
  },
})

export const screenTemplateStyles = (theme) => ({
  contentView: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  contentCommon: {
    paddingLeft: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    backgroundColor: theme.colors.neutralLight,
  },
  header: {
    height: STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topBar: {
    height: STRUCTURE_TAB_NAV_HEIGHT * 0.35,
    borderTopLeftRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    borderTopRightRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
    backgroundColor: theme.colors.neutralLight,
    // Blending hack
    marginBottom: -StyleSheet.hairlineWidth,
  },
  tabBar: {
    height: STRUCTURE_TAB_NAV_HEIGHT * 0.4,
    backgroundColor: theme.colors.neutralLight,
  },
})

export type CommonStyles = {
  commonStyles: ReturnType<typeof commonStyles>
  noAuthFormStyles: ReturnType<typeof noAuthFormStyles>
  screenTemplateStyles: ReturnType<typeof screenTemplateStyles>
}
