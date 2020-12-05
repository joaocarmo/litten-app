/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import { Right as RightArrow } from 'images/components/arrows'
import { UI_ICON_SIZE_MICRO } from 'utils/constants'
import colors from 'styles/colors'

const ScrollToBottomComponent: (args: any) => React$Node = () => (
  <RightArrow
    height={UI_ICON_SIZE_MICRO}
    width={UI_ICON_SIZE_MICRO}
    fill={colors.darkGray}
    style={styles.iconScrollToBottom}
  />
)

const styles = StyleSheet.create({
  iconScrollToBottom: {
    transform: [{ rotateZ: '90deg' }],
  },
})

export default ScrollToBottomComponent
