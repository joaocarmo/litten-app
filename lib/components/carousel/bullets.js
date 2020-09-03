/**
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'
import { iterateTimes } from 'utils/functions'

const Bullets: (args: any) => React$Node = ({
  intervals,
  activeInterval,
  style,
}) => (
  <View style={styles.bullets}>
    {iterateTimes(intervals).map((n) => (
      <Text
        key={n}
        style={
          activeInterval === n
            ? StyleSheet.compose(styles.bulletActive, style)
            : StyleSheet.compose(styles.bulletInactive, style)
          // eslint-disable-next-line react/jsx-no-literals
        }>
        &bull;
      </Text>
    ))}
  </View>
)

const styles = StyleSheet.create({
  bullets: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    marginBottom: 5,
  },
  bulletActive: {
    paddingHorizontal: 5,
    fontSize: 20,
    opacity: 0.5,
    color: colors.black,
  },
  bulletInactive: {
    paddingHorizontal: 5,
    fontSize: 20,
    opacity: 0.1,
    color: colors.black,
  },
})

export default Bullets
