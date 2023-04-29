import React, {memo} from 'react'

import {UseQueryHookResult} from '@reduxjs/toolkit/dist/query/react/buildHooks'
import {FlashList} from '@shopify/flash-list'

import {useScreenBlockCurrent} from 'src/hooks'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {ProductPreviewInfo, ProductsDataI} from 'src/types'

import {ProductCard} from './ProductCard'
import {LoadingProductListSkeleton} from './Skeletons/LoadingProductList'

interface RenderProductListProps {
  headerComponent: JSX.Element
  loadNext?: () => void
  curData?: ProductsDataI
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export const RenderProductList = memo(
  ({
    headerComponent,
    onPressProduct,
    curData,
    loadNext,
  }: RenderProductListProps) => {
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
        ListHeaderComponent={headerComponent}
        keyExtractor={item => item.productId}
        data={curData?.data ?? []}
      />
    )
  },
)
