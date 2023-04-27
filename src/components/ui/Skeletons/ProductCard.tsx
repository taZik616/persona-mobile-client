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

interface ProductCardSkeletonProps {
  width?: number
}

export const ProductCardSkeleton = memo(
  ({width = 200}: ProductCardSkeletonProps) => {
    const lineW = width / 2.5
    const gradX = useSharedValue(-lineW)

    useEffect(() => {
      const runAnim = () => {
        gradX.value = -lineW
        setTimeout(() => {
          gradX.value = withTiming(width + lineW, SKELETON_ANIM_CONF, () => {
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
      <View style={styles.mainContainer}>
        <View style={(styles.root, {width})}>
          <View style={styles.listItemContainer}>
            <View style={styles.imageBlock} />
            <View style={styles.brandBlock} />
            <View style={styles.title} />
            <AnimatedGradient
              locations={[0, 0.35, 0.65, 1]}
              colors={[
                Color.secondaryGray,
                Color.white,
                Color.white,
                Color.secondaryGray,
              ]}
              style={[styles.listItemGrad, {width: lineW}, lineAnim]}
              end={{x: 1, y: 0.5}}
              start={{x: 0, y: 0.5}}
            />
          </View>
        </View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  listItemContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  root: {
    overflow: 'hidden',
  },
  listItemGrad: {
    height: '100%',
    position: 'absolute',
    opacity: 0.36,
    zIndex: 1,
  },
  imageBlock: {
    width: '100%',
    borderRadius: 12,
    aspectRatio: '140/180',
    backgroundColor: Color.secondaryGray,
  },
  brandBlock: {
    width: '70%',
    height: 32,
    alignSelf: 'center',
    backgroundColor: Color.secondaryGray,
    marginTop: 6,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
  title: {
    backgroundColor: Color.secondaryGray,
    width: '85%',
    height: 20,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 6,
  },
})
