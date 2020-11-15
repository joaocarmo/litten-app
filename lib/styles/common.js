/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
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

const elevated = commonStyles.elevated
const veryElevated = commonStyles.veryElevated

export default commonStyles

export { elevated, veryElevated, noAuthFormStyles }
