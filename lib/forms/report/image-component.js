/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Pressable } from 'react-native'
import { useTheme } from 'hooks'
import { UIImage } from 'ui-elements'
import {
  MAX_NUM_OF_REPORT_IMAGES,
  UI_ELEMENT_BORDER_RADIUS,
  USER_AVATAR_SIZE_MEDIUM,
} from 'utils/constants'

const FLEX_BASIS = (0.95 * (1 / MAX_NUM_OF_REPORT_IMAGES) * 100).toFixed(1)

const ImageComponent: (args: any) => Node = ({ source, ...otherProps }) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    reportImageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: USER_AVATAR_SIZE_MEDIUM,
      flexBasis: `${FLEX_BASIS}%`,
      aspectRatio: 1,
      borderRadius: UI_ELEMENT_BORDER_RADIUS,
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
  }))

  return (
    <Pressable style={styles.reportImageContainer} {...otherProps}>
      <UIImage source={source} style={styles.reportImage} />
    </Pressable>
  )
}

export default ImageComponent
