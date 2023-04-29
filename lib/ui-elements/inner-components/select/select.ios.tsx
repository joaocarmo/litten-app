import { Modal, Pressable, View } from 'react-native'
import { useTheme } from '@hooks'
import UISelectPicker from '@ui-elements/inner-components/select/picker'
import type { IOSSelectProps } from '@ui-elements/inner-components/select'
import { UI_MODAL_MIN_HEIGHT } from '@utils/constants'

const IOSSelect = ({
  items,
  selectedValue,
  selectorOpen,
  toggleModal,
  ...otherProps
}: IOSSelectProps) => {
  const { createStyles } = useTheme()
  const styles = createStyles((theme) => ({
    iosModalTopContent: {
      flex: 1,
    },
    iosBottomContent: {
      height: UI_MODAL_MIN_HEIGHT,
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundElement,
    },
  }))

  return (
    <Modal
      animationType="slide"
      supportedOrientations={['portrait']}
      transparent
      visible={selectorOpen}
    >
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
}

export default IOSSelect
