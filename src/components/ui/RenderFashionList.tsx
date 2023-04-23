import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {FashionListItemT} from 'src/types'

import {FashionListItem} from './FashionListItem'

interface RenderFashionListProps {
  data: FashionListItemT[]
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
      renderItem={({item}) => (
        <FashionListItem onPress={onPressItem} {...item} />
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
