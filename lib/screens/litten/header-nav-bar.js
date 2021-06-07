/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import GoBack from 'components/go-back'
import Share from 'components/share'
import { UIHeader } from 'ui-elements'
import { opacity2Hex } from 'utils/functions'
import { STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN } from 'utils/constants'
import colors from 'styles/colors'

const LittenHeaderNavBar: (props: {
  litten: any,
  opacity: number,
  preview: boolean,
}) => Node = ({ litten, opacity = 0, preview = false }) => {
  const { top } = useSafeAreaInsets()

  const isAndroid = Platform.OS === 'android'

  const backgroundColor =
    opacity > 0 ? `${colors.blue}${opacity2Hex(opacity)}` : 'transparent'

  return (
    <View
      style={[styles.littenHeaderNavBar, { paddingTop: top, backgroundColor }]}>
      <GoBack filler={isAndroid} />
      {opacity > 30 && (
        <UIHeader
          centered
          subheader
          numberOfLines={1}
          style={styles.littenHeaderNavBarTitle}>
          {litten.title}
        </UIHeader>
      )}
      <Share litten={litten} filler={preview || !litten.active} />
    </View>
  )
}

const styles = StyleSheet.create({
  littenHeaderNavBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 0,
    paddingLeft: 2 * STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    paddingRight: 2 * STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    paddingBottom: STRUCTURE_TEMPLATE_SCREEN_HEADER_MARGIN,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  littenHeaderNavBarTitle: {
    flex: 1,
    color: colors.white,
  },
})

export default LittenHeaderNavBar
