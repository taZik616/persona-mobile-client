import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {FlashList} from '@shopify/flash-list'
import {ScrollView} from 'react-native'

import {useGender, useProductListHelper, useScreenBlockCurrent} from 'src/hooks'
import {OrderingType, ProductsParams, useProductsList} from 'src/store/shopApi'
import {BrandType, OrderingItemI, ProductPreviewInfo} from 'src/types'

import {SortSelect, SortSelectRefType} from 'ui/bottom-sheets'
import {ProductCard} from 'ui/cards'
import {BrandSearching, BrandSearchingRefType, Spacer} from 'ui/index'
import {LoadingProductListSkeleton} from 'ui/Skeletons/LoadingProductList'

import {Counter} from './Counter'
import {Filter, FilterRefType} from './ProductFilters'
import {SizeSelect, SizeSelectRefType} from './SizeSelect'

interface ProductListProps extends ProductsParams {
  onPressProduct?: (item: ProductPreviewInfo) => void
  showCounter?: boolean
  showFilter?: boolean
  showCategoriesFilter?: boolean
  genderIgnore?: boolean
}

export interface ProductListRef {
  setParams: React.Dispatch<React.SetStateAction<ProductsParams>>
}

export const ProductList = memo(
  forwardRef<ProductListRef, ProductListProps>(
    (
      {
        onPressProduct,
        showCounter,
        showFilter,
        showCategoriesFilter,
        genderIgnore,
        ...defaultParams
      },
      ref,
    ) => {
      const sortSelectRef = useRef<SortSelectRefType>(null)
      const brandSelectRef = useRef<BrandSearchingRefType>(null)
      const sizeSelectRef = useRef<SizeSelectRefType>(null)
      const filterRef = useRef<FilterRefType>(null)

      const [params, setParams] = useState<ProductsParams>(defaultParams)
      const {isMenSelected} = useGender()
      useImperativeHandle(ref, () => ({
        setParams,
      }))

      useEffect(() => {
        setParams(defaultParams)
      }, [isMenSelected])

      useScreenBlockCurrent()
      const {numColumns, cardWidth, contentPaddingsStyle} =
        useProductListHelper()
      const {products, loadNext, isLoad} = useProductsList({
        ...params,
        gender: isMenSelected ? 'men' : 'women',
      })

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

      const onChangeSize = useCallback((sizes: string) => {
        setParams(pr => ({...pr, sizes}))
        filterRef.current?.setSizesFilters(sizes.split(','))
        sizeSelectRef.current?.close?.()
        sizeSelectRef.current?.cleanSelections()
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
              const {layoutMeasurement, contentOffset, contentSize} =
                nativeEvent
              const isScrolledToEnd =
                layoutMeasurement.height + contentOffset.y >= contentSize.height

              if (isScrolledToEnd && products?.products.length) loadNext()
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
              key={numColumns}
              numColumns={numColumns}
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
                  {showCounter && products && (
                    <Counter count={products.count} />
                  )}
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
              keyExtractor={(_, id) => String(id)}
              data={products?.products ?? []}
            />
            <Spacer height={16} />
          </ScrollView>
          <SortSelect
            ref={sortSelectRef}
            onChangeSort={onChangeSort}
            sortingVariants={SORTING_VARIANTS}
          />
          <BrandSearching
            ref={brandSelectRef}
            onCompleteSelect={onChangeBrand}
          />
          <SizeSelect
            sizes={[...new Set(products?.filters.sizes)].filter(Boolean)}
            onChangeSizes={onChangeSize}
            ref={sizeSelectRef}
          />
        </>
      )
    },
  ),
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
