import React, {memo} from 'react'

import {FlashList} from '@shopify/flash-list'

import {useScreenBlockCurrent} from 'src/hooks'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {useProductsList} from 'src/store/shopApi'
import {ProductPreviewInfo, ProductsDataI} from 'src/types'

import {ProductCard} from './ProductCard'
import {LoadingProductListSkeleton} from './Skeletons/LoadingProductList'

interface RenderProductListProps {
  renderHeader?: (curData: ProductsDataI) => JSX.Element
  onPressProduct?: (item: ProductPreviewInfo) => void
  sortBy?: string
  sortedValues?: string
  start?: number
  filterByPrice?: 'True' | 'False'
  reverse?: 'True' | 'False'
  search?: string
}

export const RenderProductList = memo(
  ({renderHeader, onPressProduct, ...queryValues}: RenderProductListProps) => {
    const {curData, loadNext} = useProductsList(queryValues)
    useScreenBlockCurrent()
    const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()

    const isLoad = !curData

    return isLoad ? (
      <LoadingProductListSkeleton
        width={cardWidth}
        style={contentPaddingsStyle}
        numColumns={numColumns}
      />
    ) : (
      <FlashList
        key={numColumns}
        numColumns={numColumns}
        onEndReached={loadNext}
        // refreshing={queryObj.isFetching && !!curData?.data}
        // onRefresh={queryObj.refetch}
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
        ListHeaderComponent={renderHeader?.(curData)}
        keyExtractor={item => item.productId}
        data={curData?.data ?? []}
      />
    )
  },
)
