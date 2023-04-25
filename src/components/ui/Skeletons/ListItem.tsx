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
import {SKELETON_ANIM_CONF} from 'src/variables'

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient)

const LIS_W = 140
const LIS_LINE_W = LIS_W / 2.5

export const ListItemSkeleton = memo(() => {
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
    transform: [{translateX: gradX.value}],
  }))

  return (
    <View>
      <View style={styles.listItemContainer}>
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
      <View style={styles.subtitle} />
    </View>
  )
})

const styles = StyleSheet.create({
  listItemContainer: {
    height: 220,
    width: LIS_W,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Color.secondaryGray,
  },
  listItemGrad: {
    height: '100%',
    position: 'absolute',
    opacity: 0.36,
    width: LIS_LINE_W,
  },
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
  subtitle: {
    backgroundColor: Color.secondaryGray,
    width: LIS_W * 0.7,
    height: 25,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: 8,
  },
})
