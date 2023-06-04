import React from 'react'

import {FlatList, ScrollView, StyleSheet} from 'react-native'
import {ProductCard} from 'ui/cards'
import {SafeLandscapeView} from 'ui/SafeLandscapeView'
import {ListItemSkeleton} from 'ui/Skeletons/ListItem'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {ProductPreviewInfo} from 'src/types'

interface HorizontalProductsListProps {
  onPressItem?: (prod: ProductPreviewInfo) => void
  isLoading?: boolean
  products: ProductPreviewInfo[]
}

export const HorizontalProductsList = ({
  onPressItem,
  isLoading,
  products,
}: HorizontalProductsListProps) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return isLoading ? (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
      <SafeLandscapeView style={styles.row} safeArea>
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </SafeLandscapeView>
    </ScrollView>
  ) : (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item}) => (
        <ProductCard singleImage width={130} onPress={onPressItem} {...item} />
      )}
      keyExtractor={i => i.productId}
      data={products}
    />
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    columnGap: 16,
  },
})
