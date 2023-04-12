import React, {memo, useEffect, useRef, useState} from 'react'

import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Orientation, {OrientationType} from 'react-native-orientation-locker'
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import {Color} from 'src/themes'
import {IS_ANDROID, SCREEN_H, SCREEN_W} from 'src/variables'

import {CardWithImage} from './CardWithImage'
import {Spacer} from './Spacer'

interface SwiperProps {
  images: string[]
  horizontalMargins?: number
}

export const Swiper = memo(({images, horizontalMargins = 24}: SwiperProps) => {
  const currentIndex = useSharedValue(0)
  const scrollRef = useRef<Animated.ScrollView>(null)
  const [orientation, setOrientation] = useState(OrientationType.UNKNOWN)

  const {width} = useWindowDimensions()
  const activeWidth = width - horizontalMargins * 2

  const handleScroll = useAnimatedScrollHandler(event => {
    currentIndex.value =
      event.contentOffset.x / (activeWidth + horizontalMargins)
  })

  useEffect(() => {
    const index = Math.round(currentIndex.value)
    // Без этого никак из за handleScroll вон там 👆
    setTimeout(
      () => {
        currentIndex.value = index
        switch (orientation) {
          case OrientationType.PORTRAIT:
          case OrientationType['PORTRAIT-UPSIDEDOWN']:
            scrollRef.current?.scrollTo({
              x: index * (SCREEN_W - horizontalMargins),
              y: 0,
              animated: false,
            })
            break
          default:
            scrollRef.current?.scrollTo({
              x: index * (SCREEN_H - horizontalMargins),
              y: 0,
              animated: false,
            })
            break
        }
      },

      IS_ANDROID ? 100 : 30,
    )
  }, [orientation])
  useEffect(() => Orientation.addOrientationListener(setOrientation), [])

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={activeWidth + horizontalMargins}
        decelerationRate="fast">
        <Spacer width={horizontalMargins} />
        <View style={[styles.flexRow, {gap: horizontalMargins}]}>
          {images.map((image, index) => (
            <CardWithImage
              key={index}
              uri={image}
              style={{width: activeWidth}}
            />
          ))}
        </View>
        <Spacer width={horizontalMargins} />
      </Animated.ScrollView>
      <Spacer height={16} />
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <DotIndicator key={index} index={index} currentIndex={currentIndex} />
        ))}
      </View>
    </View>
  )
})
interface DotIndicatorProps {
  index: number
  currentIndex: SharedValue<number>
}

const DotIndicator = ({index, currentIndex}: DotIndicatorProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [8, 16, 8],
      Extrapolate.CLAMP,
    )
    const opacity = interpolate(
      currentIndex.value,
      [index - 1, index, index + 1],
      [0.25, 1, 0.25],
      Extrapolate.CLAMP,
    )
    return {
      width,
      opacity,
    }
  })

  return <Animated.View style={[styles.dot, animatedStyle]} />
}

const styles = StyleSheet.create({
  container: {},
  flexRow: {
    flexDirection: 'row',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Color.primaryBlack,
    marginHorizontal: 2,
  },
})
