import React, {memo, useState} from 'react'

import {StyleSheet, View} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  Easing,
  SharedValue,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated'

interface ImagesLoopingProps {
  width: number
  images: string[]
}

export const ImagesLooping = memo(({width, images}: ImagesLoopingProps) => {
  const initialId = Math.floor((images.length - 1) / 2)

  const offsetX = useSharedValue(0)
  const prevX = useSharedValue(0)

  const [curId, setCurId] = useState(-initialId)
  const curData = arrayLooping(
    images,
    images.length > 4 ? images.length : 4,
    curId,
  )

  useAnimatedReaction(
    () => {
      const id = -Math.round(offsetX.value / width) - initialId
      return id
    },
    (id, previous) => {
      if (id !== previous && id !== curId) {
        runOnJS(setCurId)(id)
      }
    },
    [curId, width],
  )
  const gesture = Gesture.Pan()
    .onStart(() => {
      prevX.value = offsetX.value
    })
    .onChange(e => {
      const totalOffset = e.translationX + prevX.value
      offsetX.value = totalOffset
    })
    .onEnd(e => {
      offsetX.value = withDecay(
        {
          velocity: e.velocityX,
          deceleration: 0.995,
          //   clamp: [
          //     Math.floor(offsetX.value / WIDTH) * WIDTH,
          //     Math.ceil(offsetX.value / WIDTH) * WIDTH,
          //   ],
        },
        () => {
          offsetX.value = withTiming(
            Math.round(offsetX.value / width) * width,
            {
              duration: 120,
              easing: Easing.out(Easing.quad),
            },
          )
        },
      )
    })
  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.container, {width}]}>
        {curData.map(item => {
          return (
            <Item
              key={String(item.index)}
              width={width}
              item={item}
              offsetX={offsetX}
            />
          )
        })}
      </View>
    </GestureDetector>
  )
})

interface ItemProps {
  item: any
  offsetX: SharedValue<number>
  width: number
}

const Item = ({item, offsetX, width}: ItemProps) => {
  const anim = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}],
    marginLeft: item.index * width,
  }))

  return (
    <Animated.View
      // onPress={() => handleItemClick(index)}
      style={[styles.imageContainer, {width}, anim]}>
      <FastImage
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: item.item,
        }}
      />
    </Animated.View>
  )
}

const arrayLooping = (
  array: any[],
  itemsPerSlice: number,
  currentId: number,
) => {
  const arrLen = array.length

  const infinityArr = [
    {
      item: array[((currentId % arrLen) + arrLen) % arrLen],
      index: currentId,
    },
  ]
  for (var j = 1; j < itemsPerSlice; j++) {
    let index = (currentId + j) % arrLen
    if (index < 0) {
      index += arrLen
    }
    infinityArr.push({
      item: array[index],
      index: currentId + j,
    })
  }
  return infinityArr
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    aspectRatio: '140/180',
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    aspectRatio: '140/180',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
})
