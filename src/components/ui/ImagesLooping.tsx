import React, {memo} from 'react'

import {Image, StyleSheet, View} from 'react-native'
import Carousel from 'react-native-snap-carousel'

interface ImagesLoopingProps {
  width: number
  images: string[]
}

export const ImagesLooping = memo(({width, images}: ImagesLoopingProps) => {
  return (
    <Carousel
      renderItem={({item: uri}) => (
        <View style={[styles.imageContainer, {width}]}>
          <Image style={styles.image} resizeMode="cover" source={{uri}} />
        </View>
      )}
      bounces={false}
      keyExtractor={(a, id) => String(id)}
      data={images}
      loop
      loopClonesPerSide={images.length}
      inactiveSlideOpacity={1}
      inactiveSlideScale={1}
      slideStyle={{width}}
      activeAnimationType="spring"
      windowSize={6}
      layout="default"
      horizontal
      sliderWidth={width}
      itemWidth={width}
    />
  )
})

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    aspectRatio: '140/180',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
})
