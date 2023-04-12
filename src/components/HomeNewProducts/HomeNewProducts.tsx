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
  onPressAddToBasket?: (item: ProductPreviewInfo) => void
  onPressTopRightIcon?: (item: ProductPreviewInfo) => void
}

export const HomeNewProducts = ({
  onPressProduct,
  onPressAddToBasket,
  onPressTopRightIcon,
}: HomeNewProductsProps) => {
  const {isMenSelected, onChangeGender, values} = useGender()

  useScreenBlockCurrent()

  const products = useGetProductsQuery({
    end: 200,
    start: 100,
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
      <FlashList
        key={numColumns}
        numColumns={numColumns}
        estimatedItemSize={351} // if showAddToBasket - 379
        contentContainerStyle={contentPaddingsStyle}
        renderItem={({item}) => (
          <ProductCard
            width={cardWidth}
            onPressTopRightIcon={onPressTopRightIcon}
            onPressAddToBasket={onPressAddToBasket}
            onPress={onPressProduct}
            {...item}
          />
        )}
        ListHeaderComponent={() => <Spacer height={12} />}
        keyExtractor={item => item.productId}
        data={!products.isLoading ? products.currentData : []}
      />
    </>
  )
}

// const styles = StyleSheet.create({})
