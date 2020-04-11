/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'

const Bullets: () => React$Node = ({ intervals, activeInterval }) => (
  <View style={styles.bullets}>
    {[...Array(intervals)].map((el, idx) => (
      <Text
        key={idx}
        style={
          activeInterval === idx + 1
            ? styles.bulletActive
            : styles.bulletInactive
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
