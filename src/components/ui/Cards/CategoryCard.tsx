import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {Spacer} from 'src/components/ui/Spacer'
import {Text} from 'src/components/ui/Text'
import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {CategoryType} from 'src/types'

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
          <View style={styles.brandOrNameContainer}>
            <Text center cg3>
              {name.toUpperCase()}
            </Text>
          </View>
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
  brandOrNameContainer: {
    height: 26,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
