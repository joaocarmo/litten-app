/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'hooks'
import { Right as RightArrow } from 'images/components/arrows'
import { UI_ICON_SIZE_MICRO } from 'utils/constants'

const ScrollToBottomComponent: (args: any) => Node = () => {
  const {
    theme: { colors },
  } = useTheme()

  return (
    <RightArrow
      height={UI_ICON_SIZE_MICRO}
      width={UI_ICON_SIZE_MICRO}
      fill={colors.neutralDark}
      style={styles.iconScrollToBottom}
    />
  )
}

const styles = StyleSheet.create({
  iconScrollToBottom: {
    transform: [{ rotateZ: '90deg' }],
  },
})

export default ScrollToBottomComponent
