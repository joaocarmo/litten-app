/**
 * @format
 * @flow
 */

import { StyleSheet } from 'react-native'
import { UIImage } from 'ui-elements'
import { iconChevron } from 'images'

const ScrollToBottomComponent: (args: any) => React$Node = () => (
  <UIImage source={iconChevron} style={styles.iconScrollToBottom} />
)

const styles = StyleSheet.create({
  iconScrollToBottom: {
    height: 12,
    width: 12,
    transform: [{ rotateZ: '90deg' }],
  },
})

export default ScrollToBottomComponent
