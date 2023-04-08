import React from 'react'

import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import {Color} from 'src/themes'

import {Spacer} from './Spacer'

interface SwiperProps {
  images: string[]
  horizontalMargins?: number
}

export function Swiper({images, horizontalMargins = 24}: SwiperProps) {
  const currentIndex = useSharedValue(0)

  const {width} = useWindowDimensions()
  const activeWidth = width - horizontalMargins * 2

  const handleScroll = useAnimatedScrollHandler(event => {
    currentIndex.value = event.contentOffset.x / activeWidth
  })

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled
        scrollEventThrottle={16}
        snapToInterval={activeWidth + horizontalMargins}
        decelerationRate="fast">
        <Spacer width={horizontalMargins} />
        <View style={[styles.flexRow, {gap: horizontalMargins}]}>
          {images.map((image, index) => (
            <View
              key={index}
              style={[styles.imageContainer, {width: activeWidth}]}>
              <Animated.Image source={{uri: image}} style={styles.image} />
            </View>
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
}

interface DotIndicatorProps {
  index: number
  currentIndex: SharedValue<number>
}

function DotIndicator({index, currentIndex}: DotIndicatorProps) {
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
  imageContainer: {
    height: 200,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
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
