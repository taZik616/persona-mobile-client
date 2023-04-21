import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {FashionListItem} from 'src/types'

import {FashionItem} from './FashionItem'

interface RenderFashionListProps {
  data: FashionListItem[]
  onPressItem?: (id: string) => void
}

export const RenderFashionList = ({
  data,
  onPressItem,
}: RenderFashionListProps) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item}) => <FashionItem onPress={onPressItem} {...item} />}
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
