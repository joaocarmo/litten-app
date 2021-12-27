/**
 * @format
 * @flow
 */

import type { Node } from 'react'
import { useSafeNavigation } from 'hooks'
import { Pressable, StyleSheet, View } from 'react-native'
import { useTheme } from 'hooks'
import { Left as LeftArrow } from 'images/components/arrows'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_GO_BACK_BUTTON_SIZE,
} from 'utils/constants'

const GoBack: (args: any) => Node = ({ filler = false }) => {
  const navigation = useSafeNavigation()

  const {
    theme: { colors },
  } = useTheme()

  if (filler) {
    return <View style={styles.goBackContainer} />
  }

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={styles.goBackContainer}>
      <LeftArrow
        width={STRUCTURE_GO_BACK_BUTTON_SIZE}
        height={STRUCTURE_GO_BACK_BUTTON_SIZE}
        fill={colors.textAlt}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  goBackContainer: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
})

export default GoBack
