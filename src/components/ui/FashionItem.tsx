import React, {memo} from 'react'

import {Image, Pressable, StyleSheet} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {vibration} from 'src/services/vibration'
import {FashionListItem} from 'src/types'

interface FashionItemProps extends FashionListItem {
  onPress?: (id: string) => void
}

export const FashionItem = memo(({onPress, ...item}: FashionItemProps) => {
  const {imgUri, id} = item

  return (
    <Pressable
      onPress={() => {
        vibration.soft()
        onPress?.(id)
      }}>
      <Image style={styles.img} source={{uri: imgUri}} />
    </Pressable>
  )
})

export const CategoryCardWHM = withHorizontalMargins(FashionItem)

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
