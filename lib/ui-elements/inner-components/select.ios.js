/**
 * @format
 * @flow
 */

import { Modal, Pressable, StyleSheet, View } from 'react-native'
import UISelectPicker from 'ui-elements/inner-components/select-picker'
import { UI_MODAL_MIN_HEIGHT } from 'utils/constants'
import colors from 'styles/colors'

const IOSSelect: (args: any) => React$Node = ({
  items,
  selectedValue,
  selectorOpen,
  toggleModal,
  ...otherProps
}) => (
  <Modal
    animationType="slide"
    supportedOrientations={['portrait']}
    transparent
    visible={selectorOpen}>
    <Pressable onPress={toggleModal} style={styles.iosModalTopContent}>
      <View style={styles.iosModalTopContent} />
    </Pressable>
    <View style={styles.iosBottomContent}>
      <UISelectPicker
        selectedValue={selectedValue}
        items={items}
        {...otherProps}
      />
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  iosModalTopContent: {
    flex: 1,
  },
  iosBottomContent: {
    height: UI_MODAL_MIN_HEIGHT,
    justifyContent: 'center',
    backgroundColor: colors.iosGray,
  },
})

export default IOSSelect
