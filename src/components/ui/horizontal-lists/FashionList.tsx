import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {FashionListItemT} from 'src/types'

import {FashionCard} from 'ui/cards'

interface FashionListProps {
  data: FashionListItemT[]
  onPressItem?: (id: number) => void
}

export const FashionList = ({data, onPressItem}: FashionListProps) => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.categoryContainer, paddingHorizontal]}
      renderItem={({item, index}) => (
        <FashionCard onPress={() => onPressItem?.(index)} {...item} />
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
