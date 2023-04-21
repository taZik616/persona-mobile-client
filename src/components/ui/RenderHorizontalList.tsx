import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {BrandsListItem, CategoriesListItem} from 'src/types'

import {CategoryCard} from './CategoryCard'

interface RenderHorizontalListProps<T> {
  data: T[]
  onPressItem?: (id: string) => void
}

export const RenderHorizontalList = <
  T extends CategoriesListItem | BrandsListItem,
>({
  data,
  onPressItem,
}: RenderHorizontalListProps<T>) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item}) => (
        <CategoryCard onPress={onPressItem} item={item} />
      )}
      keyExtractor={i => i.id}
      data={data}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
})
