/**
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Bullets from './bullets'

const Carousel: (args: any) => React$Node = ({
  bounces,
  bulletContainerStyle,
  bulletContrast = false,
  bulletStyle,
  fill = false,
  items = [],
  placeholder,
  ...otherProps
}) => {
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

  if (!items?.length && placeholder) {
    return <View {...otherProps}>{placeholder}</View>
  }

  return (
    <View {...otherProps}>
      <View style={styles.contentContainer}>
        <ScrollView
          bounces={bounces}
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
            <View
              key={key || idx}
              style={
                fill
                  ? StyleSheet.compose(styles.slide, styles.fillSlide)
                  : styles.slide
              }>
              {item}
            </View>
          ))}
        </ScrollView>
      </View>
      <Bullets
        activeInterval={activeInterval}
        bulletStyle={bulletStyle}
        contrast={bulletContrast}
        intervals={intervals}
        style={
          fill
            ? StyleSheet.compose(styles.fillBulletStyle, bulletContainerStyle)
            : bulletContainerStyle
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
    flexBasis: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 30,
  },
  fillSlide: {
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  fillBulletStyle: {
    position: 'absolute',
    bottom: 0,
  },
})

export default Carousel
