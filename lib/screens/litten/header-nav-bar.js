/**
 * @format
 * @flow
 */

import { Platform, SafeAreaView, StyleSheet } from 'react-native'
import GoBack from 'components/go-back'
import Share from 'components/share'
import {
  STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
  STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
} from 'utils/constants'

const LittenHeaderNavBar: (args: any) => React$Node = ({ litten }) => {
  const isAndroid = Platform.OS === 'android'

  return (
    <SafeAreaView style={styles.littenHeaderNavBar}>
      <GoBack filler={isAndroid} />
      <Share litten={litten} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  littenHeaderNavBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 0,
    height:
      STRUCTURE_TEMPLATE_SCREEN_HEADER_HEIGHT +
      STRUCTURE_TEMPLATE_SCREEN_HEADER_PADDING_BOTTOM,
    width: STRUCTURE_TEMPLATE_SCREEN_HEADER_WIDTH,
    marginLeft: STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    marginRight: STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    zIndex: 1,
  },
})

export default LittenHeaderNavBar
