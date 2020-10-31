/**
 * @format
 * @flow
 */

import { Modal, Pressable, StyleSheet, View } from 'react-native'
import {
  UI_MODAL_MIN_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_BORDER_RADIUS,
} from 'utils/constants'
import colors from 'styles/colors'

const UIModal: (args: any) => React$Node = ({
  children,
  onClickOutside,
  style,
  transparent = true,
  visible = false,
  ...otherProps
}) =>
  visible ? (
    <View
      style={[
        styles.uiModalContainer,
        visible ? styles.uiModalContainerBackground : undefined,
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
  ) : null

const styles = StyleSheet.create({
  uiModalContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  uiModalContainerBackground: {
    backgroundColor: `${colors.black}50`,
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
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
})

export default UIModal
