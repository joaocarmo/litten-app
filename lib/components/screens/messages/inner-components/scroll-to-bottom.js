/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import { Right as RightArrow } from 'images/components/arrows'

const ScrollToBottomComponent: (args: any) => React$Node = () => (
  <RightArrow height={12} width={12} style={styles.iconScrollToBottom} />
)

const styles = StyleSheet.create({
  iconScrollToBottom: {
    transform: [{ rotateZ: '90deg' }],
  },
})

export default ScrollToBottomComponent
