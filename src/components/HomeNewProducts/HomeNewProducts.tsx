import React from 'react'

import {FlatList, StyleSheet, useWindowDimensions} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getNumColumnsByWidth} from 'src/helpers'
import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {useGetProductsQuery} from 'src/store/shopApi'
import {ProductPreviewInfo} from 'src/types'

import {Header} from '../ui/Header'
import {ProductCard} from '../ui/ProductCard'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export function HomeNewProducts({onPressProduct}: HomeNewProductsProps) {
  const {isMenSelected, onChangeGender, values} = useGender()
  const {width} = useWindowDimensions()
  const {left, right} = useSafeAreaInsets()
  useScreenBlockCurrent()

  const activeWidth = width - (left + right)
  const numColumns = getNumColumnsByWidth(activeWidth)

  const products = useGetProductsQuery({
    end: 20,
    start: 0,
    sortBy: 'stock',
    sortedValues: '1',
  })

  const cardWidth = numColumns === 2 ? (activeWidth - 48 - 10 * 2) / 2 : 200

  return (
    <>
      <Header title="Новые поступления" />
      <SelectorTwoOptions onChange={onChangeGender} values={values} />

      <FlatList
        key={numColumns}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={{
          paddingLeft: left + 24,
          paddingRight: right + 24,
        }}
        renderItem={({item}) => (
          <ProductCard width={cardWidth} onPress={onPressProduct} {...item} />
        )}
        ListHeaderComponent={() => <Spacer height={12} />}
        keyExtractor={item => item.productId}
        data={!products.isLoading ? products.currentData : []}
      />
    </>
  )
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
})
