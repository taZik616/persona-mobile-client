import React from 'react'

import {FlashList} from '@shopify/flash-list'

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

export const HomeNewProducts = ({onPressProduct}: HomeNewProductsProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()

  useScreenBlockCurrent()

  const products = useGetProductsQuery({
    end: 10700,
    start: 10600,
    sortBy: 'stock',
    sortedValues: '1',
  })

  const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()

  return (
    <>
      <Header title="Новые поступления" />
      <SelectorTwoOptions
        isSecondActive={isMenSelected}
        onChange={onChangeGender}
        values={values}
      />
      <Spacer height={8} />
      <FlashList
        key={numColumns}
        numColumns={numColumns}
        refreshing={products.isFetching && !!products.currentData}
        onRefresh={products.refetch}
        estimatedItemSize={351} // if showAddToBasket - 379
        contentContainerStyle={contentPaddingsStyle}
        renderItem={({item}) => (
          <ProductCard
            width={cardWidth}
            topRightIcon="star"
            onPress={onPressProduct}
            {...item}
          />
        )}
        ListHeaderComponent={renderListHeader}
        keyExtractor={item => item.productId}
        data={!products.isLoading ? products.currentData : []}
      />
    </>
  )
}
const renderListHeader = () => <Spacer height={12} />
