/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Bullets from './bullets'

const Carousel: () => React$Node = ({ items, style }) => {
  const [activeInterval, setActiveInterval] = useState(1)
  const [intervals, setIntervals] = useState(1)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setIntervals(items.length)
  }, [items.length])

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i
      }
      if (i === intervals) {
        return i
      }
    }
  }

  return (
    <View style={style}>
      <View style={styles.container}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            ...styles.scrollView,
            width: `${100 * intervals}%`,
          }}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={(w) => setWidth(w)}
          onScroll={({
            nativeEvent: {
              contentOffset: { x },
            },
          }) => setActiveInterval(getInterval(x))}
          scrollEventThrottle={200}
          pagingEnabled
          decelerationRate="fast">
          {items.map(({ key, item }, idx) => (
            <View key={key || idx} style={styles.slide}>
              {item}
            </View>
          ))}
        </ScrollView>
      </View>
      <Bullets intervals={intervals} activeInterval={activeInterval} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  slide: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
})

export default Carousel
