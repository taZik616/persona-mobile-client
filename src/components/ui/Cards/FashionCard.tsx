import React, {memo} from 'react'

import {Image, Pressable, StyleSheet} from 'react-native'

import {vibration} from 'src/services/vibration'
import {FashionListItemT} from 'src/types'

interface FashionCardProps extends FashionListItemT {
  onPress?: () => void
}

export const FashionCard = memo(({onPress, ...item}: FashionCardProps) => {
  const {imgUri} = item

  return (
    <Pressable
      onPress={() => {
        vibration.soft()
        onPress?.()
      }}>
      <Image style={styles.img} source={{uri: imgUri}} />
    </Pressable>
  )
})

const styles = StyleSheet.create({
  containerForHorizontalScroll: {
    height: 220,
    width: 140,
    overflow: 'visible',
  },
  img: {
    height: 250,
    width: 150,
  },
})
