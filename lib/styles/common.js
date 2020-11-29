/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
} from 'utils/constants'
import colors from 'styles/colors'

const commonStyles = StyleSheet.create({
  elevated: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  veryElevated: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
})

const noAuthFormStyles = StyleSheet.create({
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

const screenTemplateStyles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  contentCommon: {
    paddingLeft: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    paddingRight: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    backgroundColor: colors.lightGray,
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
    backgroundColor: colors.lightGray,
    // Blending hack
    marginBottom: -StyleSheet.hairlineWidth,
  },
  tabBar: {
    height: STRUCTURE_TAB_NAV_HEIGHT * 0.4,
    backgroundColor: colors.lightGray,
  },
})

const elevated = commonStyles.elevated
const veryElevated = commonStyles.veryElevated

export default commonStyles

export { elevated, veryElevated, noAuthFormStyles, screenTemplateStyles }
