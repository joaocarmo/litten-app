/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, View } from 'react-native'
import { Left as LeftArrow } from 'images/components/arrows'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_GO_BACK_BUTTON_SIZE,
} from 'utils/constants'
import colors from 'styles/colors'

const GoBack: (args: any) => React$Node = ({ filler = false }) => {
  const navigation = useNavigation()

  return filler ? (
    <View style={styles.goBackContainer} />
  ) : (
    <Pressable
      onPress={() => navigation.goBack()}
      style={styles.goBackContainer}>
      <LeftArrow
        width={STRUCTURE_GO_BACK_BUTTON_SIZE}
        height={STRUCTURE_GO_BACK_BUTTON_SIZE}
        fill={colors.white}
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
