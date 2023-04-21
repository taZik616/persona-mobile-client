import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {selectRecentlyWatched, useTypedSelector} from 'src/store'
import {ProductPreviewInfo} from 'src/types'

import {ProductCard} from '../ui/ProductCard'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

interface RecentlyWatchedListProps {
  onPressItem?: (item: ProductPreviewInfo) => void
}

export const RecentlyWatchedList = ({
  onPressItem,
}: RecentlyWatchedListProps) => {
  const recentlyWatched = useTypedSelector(selectRecentlyWatched)
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})

  if (!recentlyWatched.length) return <></>
  return (
    <>
      <Text center cg2>
        ПРОСМОТРЕННЫЕ ТОВАРЫ
      </Text>
      <Spacer height={14} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
        keyExtractor={i => i.productId}
        renderItem={({item}) => (
          <ProductCard
            singleImage
            onPress={onPressItem}
            hidePrice
            width={120}
            {...item}
          />
        )}
        data={recentlyWatched}
      />
    </>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    gap: 16,
  },
})
