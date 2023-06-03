import React, {memo, useCallback, useEffect, useRef, useState} from 'react'

import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'
import {SortSelect, SortSelectRefType} from 'ui/bottom-sheets/SortSelect'
import {ProductCard} from 'ui/cards'
import {BrandSearching, BrandSearchingRefType, Spacer} from 'ui/index'
import {LoadingProductListSkeleton} from 'ui/Skeletons/LoadingProductList'

import {useProductListHelper, useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {OrderingType, ProductsParams, useProductsList} from 'src/store/shopApi'
import {BrandType, OrderingItemI, ProductPreviewInfo} from 'src/types'

import {Counter} from './Counter'
import {Filter, FilterRefType} from './ProductFilters'
import {SizeSelect, SizeSelectRefType} from './SizeSelect'

interface ProductListProps extends ProductsParams {
  onPressProduct?: (item: ProductPreviewInfo) => void
  showCounter?: boolean
  showFilter?: boolean
  showCategoriesFilter?: boolean
}

export const ProductList = memo(
  ({
    onPressProduct,
    showCounter,
    showFilter,
    showCategoriesFilter,
    ...queryParams
  }: ProductListProps) => {
    const [params, setParams] = useState<ProductsParams>(queryParams)
    const {isMenSelected} = useGender()
    const {products, loadNext, isLoad} = useProductsList({
      ...params,
      gender: isMenSelected ? 'men' : 'women',
    })

    useEffect(() => {
      setParams(queryParams)
    }, [isMenSelected])

    useScreenBlockCurrent()
    const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()
    const sortSelectRef = useRef<SortSelectRefType>(null)
    const brandSelectRef = useRef<BrandSearchingRefType>(null)
    const sizeSelectRef = useRef<SizeSelectRefType>(null)
    const filterRef = useRef<FilterRefType>(null)

    const onChangeSort = useCallback((ordering: OrderingType) => {
      setParams(pr => ({...pr, ordering}))
      sortSelectRef.current?.close?.()
    }, [])

    const onChangeBrand = useCallback(
      (brandIds: string, brands: BrandType[]) => {
        setParams(pr => ({...pr, brandIds}))
        filterRef.current?.setBrandFilters(brands)
        brandSelectRef.current?.close?.()
        brandSelectRef.current?.cleanSelections()
      },
      [],
    )

    const onChangeCategory = useCallback((categoryId?: number) => {
      setParams(pr => ({...pr, categoryId}))
    }, [])

    const onRemoveBrandFilter = useCallback((brandId: string) => {
      setParams(pr => ({
        ...pr,
        brandIds: pr.brandIds
          ?.split(',')
          .filter((b: string) => b !== brandId)
          .join(','),
      }))
    }, [])

    const onRemoveSizeFilter = useCallback((size: string) => {
      setParams(pr => ({
        ...pr,
        sizes: pr.sizes
          ?.split(',')
          .filter((b: string) => b !== size)
          .join(','),
      }))
    }, [])

    const onChangeSize = useCallback((sizes: string) => {
      setParams(pr => ({...pr, sizes}))
      filterRef.current?.setSizesFilters(sizes.split(','))
      sizeSelectRef.current?.close?.()
      sizeSelectRef.current?.cleanSelections()
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

    return (
      <>
        <ScrollView
          onScroll={({nativeEvent}) => {
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent
            const isScrolledToEnd =
              layoutMeasurement.height + contentOffset.y >= contentSize.height

            if (isScrolledToEnd) {
              products?.products.length && loadNext()
            }
          }}>
          {showFilter && (
            <Filter
              key={isMenSelected ? 'men' : 'women'}
              ref={filterRef}
              showCategories={showCategoriesFilter}
              onPressSize={onPressSize}
              onPressSort={onPressSort}
              onPressBrands={onPressBrands}
              onChangeCategory={onChangeCategory}
              onRemoveBrand={onRemoveBrandFilter}
              onRemoveSize={onRemoveSizeFilter}
            />
          )}
          <FlashList
            scrollEnabled={false}
            directionalLockEnabled={false}
            key={numColumns}
            numColumns={numColumns}
            refreshing={isLoad}
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
              <>
                {showCounter && products && <Counter count={products.count} />}
                {!showCounter && products && !showFilter ? (
                  <Spacer height={20} />
                ) : (
                  <></>
                )}
              </>
            }
            ListEmptyComponent={
              isLoad ? (
                <LoadingProductListSkeleton
                  width={cardWidth}
                  numColumns={numColumns}
                />
              ) : undefined
            }
            keyExtractor={(item: any, id) => item?.productId ?? String(id)}
            data={products?.products ?? []}
          />
        </ScrollView>
        <SortSelect
          ref={sortSelectRef}
          onChangeSort={onChangeSort}
          sortingVariants={SORTING_VARIANTS}
        />
        <BrandSearching ref={brandSelectRef} onCompleteSelect={onChangeBrand} />
        <SizeSelect
          sizes={[...new Set(products?.filters.sizes)].filter(Boolean)}
          onChangeSizes={onChangeSize}
          ref={sizeSelectRef}
        />
      </>
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
