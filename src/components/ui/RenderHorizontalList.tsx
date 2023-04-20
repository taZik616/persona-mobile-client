import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {CategoryInterface} from 'src/types'

import {CategoryCard} from '../ui/CategoryCard'

interface RenderHorizontalListProps {
  data: CategoryInterface[]
  onPressItem?: (item: CategoryInterface) => void
}

const CategoryCardWHM = withHorizontalMargins(CategoryCard)

export const RenderHorizontalList = ({
  data,
  onPressItem,
}: RenderHorizontalListProps) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
      renderItem={({item}) => (
        <CategoryCardWHM onPress={onPressItem} {...item} />
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
