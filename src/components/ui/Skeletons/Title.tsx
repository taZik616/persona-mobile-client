import React, {memo, useEffect} from 'react'

import {StyleSheet, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {Color} from 'src/themes'
import {SCREEN_W, SKELETON_ANIM_CONF} from 'src/variables'

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

interface TitleSkeletonProps {
  width?: number
  lineWidth?: number
  center?: boolean
  height?: number
  borderRadius?: number
}

export const TitleSkeleton = memo(
  ({
    width = SCREEN_W / 3,
    lineWidth = SCREEN_W / 3 / 2.5,
    center,
    height = 22,
    borderRadius = 12,
  }: TitleSkeletonProps) => {
    const gradX = useSharedValue(-lineWidth)

    useEffect(() => {
      const runAnim = () => {
        gradX.value = -lineWidth
        setTimeout(() => {
          gradX.value = withTiming(
            width + lineWidth,
            SKELETON_ANIM_CONF,
            () => {
              runOnJS(runAnim)()
            },
          )
        }, 200)
      }
      runAnim()
    }, [])

    const lineAnim = useAnimatedStyle(() => ({
      transform: [{translateX: gradX.value}],
    }))

    return (
      <View
        style={[
          styles.listItemContainer,
          {width, height, borderRadius},
          center && styles.centered,
        ]}>
        <AnimatedGradient
          locations={[0, 0.35, 0.65, 1]}
          colors={[
            Color.secondaryGray,
            Color.white,
            Color.white,
            Color.secondaryGray,
          ]}
          style={[styles.listItemGrad, {width: lineWidth}, lineAnim]}
          end={{x: 1, y: 0.5}}
          start={{x: 0, y: 0.5}}
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  listItemContainer: {
    height: 20,
    overflow: 'hidden',
    backgroundColor: Color.secondaryGray,
  },
  listItemGrad: {
    height: '100%',
    position: 'absolute',
    opacity: 0.36,
  },
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
  centered: {
    alignSelf: 'center',
  },
})
