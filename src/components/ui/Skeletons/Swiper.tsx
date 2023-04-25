import React, {memo, useEffect} from 'react'

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {Color} from 'src/themes'
import {CARD_ASPECT_RATIO, SKELETON_ANIM_CONF} from 'src/variables'

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

const LIS_W = 100
const LIS_LINE_W = LIS_W / 3.5

interface SwiperSkeletonProps {
  style?: StyleProp<ViewStyle>
}

export const SwiperSkeleton = memo(({style}: SwiperSkeletonProps) => {
  const gradX = useSharedValue(-LIS_LINE_W)

  useEffect(() => {
    const runAnim = () => {
      gradX.value = -LIS_LINE_W
      setTimeout(() => {
        gradX.value = withTiming(LIS_W + LIS_LINE_W, SKELETON_ANIM_CONF, () => {
          runOnJS(runAnim)()
        })
      }, 200)
    }
    runAnim()
  }, [])

  const lineAnim = useAnimatedStyle(() => ({
    left: `${gradX.value}%`,
  }))

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.image]}>
        <AnimatedGradient
          locations={[0, 0.35, 0.65, 1]}
          colors={[
            Color.secondaryGray,
            Color.white,
            Color.white,
            Color.secondaryGray,
          ]}
          style={[styles.listItemGrad, lineAnim]}
          end={{x: 1, y: 0.5}}
          start={{x: 0, y: 0.5}}
        />
      </View>
    </View>
  )
})

export const CardSkeleton = withHorizontalMargins(SwiperSkeleton)

const styles = StyleSheet.create({
  listItemGrad: {
    height: '100%',
    position: 'absolute',
    opacity: 0.36,
    width: `${LIS_LINE_W}%`,
  },
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
  container: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
    maxHeight: 300,
    maxWidth: 300 * CARD_ASPECT_RATIO,
    overflow: 'hidden',
    aspectRatio: `${CARD_ASPECT_RATIO}/1`,
    borderRadius: 10,
    backgroundColor: Color.secondaryGray,
  },
})
