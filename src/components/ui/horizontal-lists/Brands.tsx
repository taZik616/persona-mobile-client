import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {BrandsListItem} from 'src/types'

import {BrandCard} from 'ui/cards'

interface HorizontalBrandsListProps {
  onPressItem?: (brandId: string, idInList: number) => void
  brands: BrandsListItem[]
}

export const HorizontalBrandsList = ({
  onPressItem,
  brands,
}: HorizontalBrandsListProps) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item, index}) => (
        <BrandCard
          idInList={index}
          onPress={onPressItem}
          imgUri={item.imgUri}
          {...item.brand}
        />
      )}
      keyExtractor={i => i.id}
      data={brands}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
})
