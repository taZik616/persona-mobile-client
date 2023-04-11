import React from 'react'

import {FlatList, StyleSheet} from 'react-native'

import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
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

  useScreenBlockCurrent()

  const products = useGetProductsQuery({
    end: 20,
    start: 0,
    sortBy: 'stock',
    sortedValues: '1',
  })

  const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()

  return (
    <>
      <Header title="Новые поступления" />
      <SelectorTwoOptions onChange={onChangeGender} values={values} />

      <FlatList
        key={numColumns}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={contentPaddingsStyle}
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
