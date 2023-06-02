import React from 'react'

import {FlatList, StyleSheet} from 'react-native'
import {CategoryCard} from 'ui/cards/CategoryCard'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {CategoriesListItem} from 'src/types'

interface RenderHorizontalListProps {
  onPressItem?: (catId: number, idInList: number) => void
  categories: CategoriesListItem[]
}

export const HorizontalCategoriesList = ({
  onPressItem,
  categories,
}: RenderHorizontalListProps) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item, index}) => (
        <CategoryCard
          onPress={onPressItem}
          {...item.category}
          image={item.imgUri ? item.imgUri : item.category.image}
          idInList={index}
        />
      )}
      keyExtractor={i => i.id}
      data={categories}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
})
