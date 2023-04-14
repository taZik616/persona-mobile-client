import React from 'react'

import {FlatList, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {CategoryInterface} from 'src/types'

import {CategoryCard} from '../ui/CategoryCard'

interface RenderHorizontalListProps {
  data: CategoryInterface[]
  onPressItem?: (item: CategoryInterface) => void
}

export const RenderHorizontalList = ({
  data,
  onPressItem,
}: RenderHorizontalListProps) => {
  const {left, right} = useSafeAreaInsets()
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.categoryContainer,
        {paddingLeft: left + 24, paddingRight: right + 24},
      ]}
      renderItem={({item}) => <CategoryCard onPress={onPressItem} {...item} />}
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
