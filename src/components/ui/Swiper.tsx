import React, {memo, useEffect, useRef} from 'react'

import {StyleSheet, View, useWindowDimensions} from 'react-native'
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import {CardWithImage} from 'ui/cards/CardWithImage'
import {Img, Spacer} from 'ui/index'
import {SwiperSkeleton} from 'ui/Skeletons/Swiper'

import {useIsPortrait} from 'src/hooks/useIsPortrait'
import {vibration} from 'src/services/vibration'
import {Color} from 'src/themes'
import {IS_ANDROID, SCREEN_H, SCREEN_W} from 'src/variables'

interface SwiperProps {
  type?: 'card-image' | 'big-image' | 'card-image-skeleton'
  images: string[]
  horizontalMargins?: number
  borderRadius?: number
  onPress?: (id: number) => void
  hasVibration?: boolean
}

export const Swiper = memo(
  ({
    images,
    type = 'card-image',
    onPress,
    hasVibration,
    horizontalMargins = 24,
    borderRadius,
  }: SwiperProps) => {
    const currentIndex = useSharedValue(0)
    const scrollRef = useRef<Animated.ScrollView>(null)
    const {isPortrait} = useIsPortrait()

    const {width, height} = useWindowDimensions()
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
          if (isPortrait) {
            scrollRef.current?.scrollTo({
              x: index * (SCREEN_W - horizontalMargins),
              y: 0,
              animated: false,
            })
          } else {
            scrollRef.current?.scrollTo({
              x: index * (SCREEN_H - horizontalMargins),
              y: 0,
              animated: false,
            })
          }
        },
        IS_ANDROID ? 100 : 30,
      )
    }, [isPortrait])

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
            {images.map((image, index) =>
              type === 'card-image' ? (
                <CardWithImage
                  key={index}
                  uri={image}
                  onPress={() => {
                    hasVibration && vibration.soft()
                    onPress?.(index)
                  }}
                  borderRadius={borderRadius}
                  style={{width: activeWidth}}
                />
              ) : type === 'card-image-skeleton' ? (
                <SwiperSkeleton key={index} style={{width: activeWidth}} />
              ) : (
                <Img
                  key={index}
                  style={{width: activeWidth}}
                  maxHeight={height / 1.75}
                  uri={image}
                />
              ),
            )}
          </View>
          <Spacer width={horizontalMargins} />
        </Animated.ScrollView>
        <Spacer height={16} />
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <DotIndicator
              key={index}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </View>
      </View>
    )
  },
)
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
    marginLeft: 4,
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
