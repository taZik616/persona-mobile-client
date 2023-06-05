import React, {memo} from 'react'

import {FlatList, StyleSheet, View} from 'react-native'

import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'

import {Spacer} from 'ui/index'

import {BlockSkeleton} from './Block'

const empty = Array(5).fill('')

export const FashionItemsPresentSkeleton = memo(() => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})

  const renderSkeleton = () => {
    return (
      <View>
        <BlockSkeleton width={140} height={194} />
        <Spacer height={8} />
        <BlockSkeleton width={140} height={26} />
      </View>
    )
  }

  return (
    <FlatList
      data={empty}
      contentContainerStyle={[styles.listContainer, paddingHorizontal]}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(it, id) => String(id)}
      renderItem={renderSkeleton}
    />
  )
})

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
    gap: 26,
    paddingBottom: 22,
  },
})
