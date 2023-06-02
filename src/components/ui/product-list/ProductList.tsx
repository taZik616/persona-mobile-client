import React, {memo, useCallback, useRef, useState} from 'react'

import {FlashList} from '@shopify/flash-list'
import {SortSelect, SortSelectRefType} from 'ui/bottom-sheets/SortSelect'
import {ProductCard} from 'ui/cards'
import {BrandSearching, BrandSearchingRefType, Spacer} from 'ui/index'
import {LoadingProductListSkeleton} from 'ui/Skeletons/LoadingProductList'

import {useProductListHelper, useScreenBlockCurrent} from 'src/hooks'
import {OrderingType, ProductsParams, useProductsList} from 'src/store/shopApi'
import {OrderingItemI, ProductPreviewInfo, ProductsDataI} from 'src/types'

import {Counter} from './Counter'
import {Filter} from './ProductFilters'
import {SizeSelect} from './SizeSelect'

interface ProductListProps extends ProductsParams {
  renderHeader?: (curData: ProductsDataI) => JSX.Element
  onPressProduct?: (item: ProductPreviewInfo) => void
  showCounter?: boolean
  showFilter?: boolean
}

export const ProductList = memo(
  ({
    renderHeader,
    onPressProduct,
    showCounter,
    showFilter,
    ...queryParams
  }: ProductListProps) => {
    const [params, setParams] = useState<ProductsParams>(queryParams)
    const {products, loadNext, isLoad, reset} = useProductsList({
      ...params,
    })

    useScreenBlockCurrent()
    const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()
    const sortSelectRef = useRef<SortSelectRefType>(null)
    const brandSelectRef = useRef<BrandSearchingRefType>(null)
    const sizeSelectRef = useRef<BrandSearchingRefType>(null)

    const onChangeSort = useCallback((ordering: OrderingType) => {
      setParams(pr => ({...pr, ordering}))
    }, [])

    const onChangeBrand = useCallback((brandIds: string) => {
      setParams(pr => ({...pr, brandIds}))
    }, [])

    const onChangeSize = useCallback((sizes: string) => {
      console.log(sizes)
      //setParams(pr => ({...pr, brandIds}))
    }, [])

    const onPressBrands = useCallback(() => {
      brandSelectRef.current?.open?.()
    }, [])

    const onPressSort = useCallback(() => {
      sortSelectRef.current?.open?.()
    }, [])

    const onPressSize = useCallback(() => {
      sizeSelectRef.current?.open?.()
    }, [])

    return products ? (
      <>
        <FlashList
          key={numColumns}
          numColumns={numColumns}
          onEndReached={loadNext}
          refreshing={isLoad}
          onRefresh={reset}
          estimatedItemSize={351}
          contentContainerStyle={contentPaddingsStyle}
          renderItem={({item}) => (
            <ProductCard
              width={cardWidth}
              topRightIcon="star"
              onPress={onPressProduct}
              {...item}
            />
          )}
          ListHeaderComponent={
            renderHeader?.(products) ?? (
              <>
                {showFilter && (
                  <Filter
                    sizes={products.filters.sizes}
                    onPressSize={onPressSize}
                    onPressSort={onPressSort}
                    onPressBrands={onPressBrands}
                  />
                )}
                {showCounter && <Counter count={products.count} />}
                {!showCounter && !showFilter ? <Spacer height={20} /> : <></>}
              </>
            )
          }
          keyExtractor={item => item.productId}
          data={products?.products ?? []}
        />
        <SortSelect
          ref={sortSelectRef}
          onChangeSort={onChangeSort}
          sortingVariants={SORTING_VARIANTS}
        />
        <BrandSearching ref={brandSelectRef} onCompleteSelect={onChangeBrand} />
        <SizeSelect
          sizes={[...new Set(products.filters.sizes)].filter(Boolean)}
          ref={sizeSelectRef}
        />
      </>
    ) : (
      <LoadingProductListSkeleton
        width={cardWidth}
        style={contentPaddingsStyle}
        numColumns={numColumns}
      />
    )
  },
)

const SORTING_VARIANTS: OrderingItemI[] = [
  {
    name: 'Сначала обновления',
    value: '-lastUpdate',
  },
  {
    name: 'Сначала старые',
    value: 'lastUpdate',
  },
  {
    name: 'По возрастанию цены',
    value: 'price',
  },
  {
    name: 'По убыванию цены',
    value: '-price',
  },
]
