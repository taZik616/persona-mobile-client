import React, {memo} from 'react'

import {Image, Pressable, StyleSheet, View} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {BrandsListItem, CategoriesListItem} from 'src/types'

import {Spacer} from './Spacer'
import {Text} from './Text'

interface CategoryCardProps<T> {
  onPress?: (id: string) => void
  item: T
}

export const CategoryCard = memo(
  <T extends CategoriesListItem | BrandsListItem>({
    onPress,
    item,
  }: CategoryCardProps<T>) => {
    const isCat = isCategories(item)
    const {imgUri, id} = item

    return (
      <Pressable onPress={() => onPress?.(id)}>
        <View style={styles.containerForHorizontalScroll}>
          <Image style={styles.img} source={{uri: imgUri}} />
          <Spacer height={8} />
          <View style={styles.brandOrNameContainer}>
            {!isCat && item.logoUri ? (
              <Image
                resizeMode="contain"
                style={styles.logoImage}
                source={{uri: item.logoUri}}
              />
            ) : (
              <Text center cg3>
                {(isCat ? item.name : '').toUpperCase()}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    )
  },
)

export const CategoryCardWHM = withHorizontalMargins(CategoryCard)

const isCategories = (
  item: CategoriesListItem | BrandsListItem,
): item is CategoriesListItem => {
  return (item as CategoriesListItem)?.categoryId !== undefined
}

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
