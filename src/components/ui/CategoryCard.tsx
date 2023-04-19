import React, {memo} from 'react'

import {Image, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import {vibration} from 'src/services/vibration'
import {CategoryInterface} from 'src/types'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface CategoryCardProps extends CategoryInterface {
  onPress?: (item: CategoryInterface) => void
}

const withSpringConfig = {
  stiffness: 500,
  damping: 20,
  mass: 1,
  velocity: 0,
}

export const CategoryCard = memo(({onPress, ...item}: CategoryCardProps) => {
  const {uri, name, logoUri} = item

  const scale = useSharedValue(1)
  const anim = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }))
  return (
    <GestureDetector
      gesture={Gesture.Tap()
        .numberOfTaps(1)
        .onTouchesDown(() => {
          scale.value = withSpring(
            0.95,
            withSpringConfig,
            final => final && runOnJS(vibration.soft)(),
          )
        })
        .onTouchesUp(() => {
          scale.value = withSpring(1, withSpringConfig)
        })
        .onTouchesCancelled(() => {
          scale.value = withSpring(1, withSpringConfig)
        })
        .onEnd(() => {
          onPress && runOnJS(onPress)(item)
        })}>
      <Animated.View style={[styles.containerForHorizontalScroll, anim]}>
        <Image style={styles.img} source={{uri}} />
        <Spacer height={8} />
        <View style={styles.brandOrNameContainer}>
          {logoUri ? (
            <Image
              resizeMode="contain"
              style={styles.logoImage}
              source={{uri: logoUri}}
            />
          ) : (
            <Text center cg3>
              {(name ?? '').toUpperCase()}
            </Text>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  )
})

const styles = StyleSheet.create({
  containerForHorizontalScroll: {
    height: 220,
    width: 140,
    overflow: 'visible',
  },
  img: {
    flex: 1,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandOrNameContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
