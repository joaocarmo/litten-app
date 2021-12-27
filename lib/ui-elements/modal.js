/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Modal, Pressable, View } from 'react-native'
import { useTheme } from 'hooks'
import {
  DEVICE_WIDTH,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
  UI_MODAL_MIN_HEIGHT,
} from 'utils/constants'

const UIModal: (args: any) => Node = ({
  children,
  onClickOutside,
  style,
  transparent = true,
  visible = false,
  backgroundColor,
  ...otherProps
}) => {
  const { createStyles } = useTheme()

  const styles = createStyles((theme) => ({
    uiModalContainer: {
      position: 'absolute',
      height: '100%',
      width: DEVICE_WIDTH,
      minWidth: '100%',
    },
    uiModalContainerTransparentBackground: {
      backgroundColor: `${theme.colors.backgroundAlt}50`,
    },
    uiModalTopContent: {
      flex: 1,
    },
    uiBottomContent: {
      minHeight: UI_MODAL_MIN_HEIGHT,
      paddingLeft: 18,
      paddingRight: 18,
      paddingTop: 26,
      paddingBottom: 26,
      borderRadius: STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
      backgroundColor: theme.colors.neutralLight,
      overflow: 'hidden',
    },
  }))

  if (!visible) {
    return null
  }

  return (
    <View
      style={[
        styles.uiModalContainer,
        transparent
          ? styles.uiModalContainerTransparentBackground
          : {
              backgroundColor,
            },
      ]}>
      <Modal
        animationType="slide"
        supportedOrientations={['portrait']}
        transparent={transparent}
        visible={visible}
        {...otherProps}>
        <Pressable onPress={onClickOutside} style={styles.uiModalTopContent}>
          <View style={styles.uiModalTopContent} />
        </Pressable>
        <View style={styles.uiBottomContent}>{children}</View>
      </Modal>
    </View>
  )
}

export default UIModal
