import React, {memo} from 'react'

import {Image, Pressable, StyleSheet} from 'react-native'

import {vibration} from 'src/services/vibration'
import {FashionListItemT} from 'src/types'

interface FashionListItemProps extends FashionListItemT {
  onPress?: (id: string) => void
}

export const FashionListItem = memo(
  ({onPress, ...item}: FashionListItemProps) => {
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
  },
)

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
