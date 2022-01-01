import { StyleSheet } from 'react-native'
import { UILoader } from '@ui-elements'
import {
  UI_BOTTOM_LOADER_HEIGHT,
  UI_ELEMENT_BORDER_MARGIN,
} from '@utils/constants'

const BottomLoader = (props) => (
  <UILoader containerStyle={styles.listFooterComponentStyle} {...props} />
)

const styles: {
  readonly listFooterComponentStyle: {
    height: number
    marginTop: number
  }
} = StyleSheet.create({
  listFooterComponentStyle: {
    height: UI_BOTTOM_LOADER_HEIGHT,
    marginTop: UI_ELEMENT_BORDER_MARGIN,
  },
})
export const ListFooterComponentStyle = styles.listFooterComponentStyle
export default BottomLoader
