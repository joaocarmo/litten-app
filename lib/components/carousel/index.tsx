import { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import type { ScrollViewProps, ViewProps } from 'react-native'
import Bullets from '@components/carousel/bullets'
import type { BulletsProps } from '@components/carousel/bullets'
import type { BulletProps } from '@components/carousel/bullet'

type CarouselItem = {
  key: string | number
  item: ViewProps['children']
}

export type CarouselProps = {
  bounces?: ScrollViewProps['bounces']
  bulletContainerStyle?: BulletsProps['style']
  bulletContrast?: BulletProps['contrast']
  bulletStyle?: BulletProps['style']
  fill?: boolean
  items: CarouselItem[]
  placeholder?: ViewProps['children']
} & ViewProps

const Carousel = ({
  bounces,
  bulletContainerStyle,
  bulletContrast,
  bulletStyle,
  fill,
  items,
  placeholder,
  ...otherProps
}: CarouselProps) => {
  const [activeInterval, setActiveInterval] = useState(1)
  const [intervals, setIntervals] = useState(1)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setIntervals(items.length)
  }, [items.length])

  const getInterval = useCallback(
    (offset) => Math.round((offset / width) * intervals) + 1,
    [intervals, width],
  )

  const handleOnContentSizeChange = useCallback((w) => setWidth(w), [])

  const handleOnScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { x },
      },
    }) => setActiveInterval(getInterval(x)),
    [getInterval],
  )

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
          onContentSizeChange={handleOnContentSizeChange}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          pagingEnabled
          decelerationRate="fast"
        >
          {items.map(({ key, item }, idx) => (
            <View
              key={key || idx}
              style={
                fill
                  ? StyleSheet.compose(styles.slide, styles.fillSlide)
                  : styles.slide
              }
            >
              {item}
            </View>
          ))}
        </ScrollView>
      </View>
      {intervals > 1 && (
        <Bullets
          activeInterval={activeInterval}
          bulletStyle={bulletStyle}
          contrast={bulletContrast}
          intervals={intervals}
          style={
            fill
              ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore FIXME
                StyleSheet.compose(styles.fillBulletStyle, bulletContainerStyle)
              : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore FIXME
                bulletContainerStyle
          }
        />
      )}
    </View>
  )
}

Carousel.defaultProps = {
  bounces: true,
  bulletContainerStyle: undefined,
  bulletContrast: false,
  bulletStyle: undefined,
  fill: false,
  items: [],
  placeholder: null,
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
  },
  scrollView: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
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
