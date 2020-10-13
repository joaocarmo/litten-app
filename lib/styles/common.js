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

const elevated = commonStyles.elevated
const veryElevated = commonStyles.veryElevated

export default commonStyles

export { elevated, veryElevated }
