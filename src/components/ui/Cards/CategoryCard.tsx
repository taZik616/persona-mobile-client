import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {CategoryType} from 'src/types'

import {Spacer, Text} from 'ui/index'

interface CategoryCardProps extends CategoryType {
  idInList: number
  onPress?: (catId: number, idInList: number) => void
}

export const CategoryCard = memo(
  ({onPress, idInList, categoryId, image, name}: CategoryCardProps) => {
    return (
      <Pressable onPress={() => onPress?.(categoryId, idInList)}>
        <View style={styles.containerForHorizontalScroll}>
          <Image style={styles.img} source={{uri: image}} />
          <Spacer height={8} />
          <Text center numberOfLines={1} cg3>
            {name.toUpperCase()}
          </Text>
        </View>
      </Pressable>
    )
  },
)

export const CategoryCardWHM = withHorizontalMargins(CategoryCard)

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
})
