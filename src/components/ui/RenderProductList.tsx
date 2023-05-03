import React, {memo, useCallback, useMemo} from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleSheet} from 'react-native'

import {getProductsCountString} from 'src/helpers'
import {useScreenBlockCurrent} from 'src/hooks'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {useProductsList} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {ProductPreviewInfo, ProductsDataI} from 'src/types'

import {FilterItem} from './FilterItem'
import {SortIcon} from './icons/common'
import {ProductCard} from './ProductCard'
import {LoadingProductListSkeleton} from './Skeletons/LoadingProductList'
import {Spacer} from './Spacer'
import {Text} from './Text'

export type ListOrderType =
  | 'priceFromLow'
  | 'priceFromTop'
  | 'firstTheOldOnes'
  | 'latestUpdated'

interface RenderProductListProps {
  renderHeader?: (curData: ProductsDataI) => JSX.Element
  onPressProduct?: (item: ProductPreviewInfo) => void
  onPressSort?: () => void
  sortBy?: string
  sortedValues?: string
  start?: number
  listOrder?: ListOrderType
  //filterByPrice?: 'True' | 'False'
  //reverse?: 'True' | 'False'
  search?: string
  showCounter?: boolean
  showFilter?: boolean
}

export const RenderProductList = memo(
  ({
    renderHeader,
    onPressProduct,
    showCounter,
    onPressSort,
    showFilter,
    listOrder,
    ...queryValues
  }: RenderProductListProps) => {
    const sorting = useMemo(() => {
      let filterByPrice: 'True' | 'False' = 'False'
      let reverse: 'True' | 'False' = 'False'
      switch (listOrder) {
        case 'priceFromLow':
          filterByPrice = 'True'
          break
        case 'priceFromTop':
          filterByPrice = 'True'
          reverse = 'True'
          break
        case 'firstTheOldOnes':
          reverse = 'True'
          break
      }

      return {reverse, filterByPrice}
    }, [listOrder])

    const {curData, loadNext} = useProductsList({
      ...queryValues,
      filterByPrice: sorting.filterByPrice,
      reverse: sorting.reverse,
    })

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
        ListHeaderComponent={
          renderHeader?.(curData) ?? (
            <>
              {showFilter && <Filter onPressSort={onPressSort} />}
              {showCounter && <Counter count={curData.count} />}
              {!showCounter && !showFilter ? <Spacer height={20} /> : <></>}
            </>
          )
        }
        keyExtractor={item => item.productId}
        data={curData?.data ?? []}
      />
    )
  },
)

interface FilterProps {
  onPressSort?: () => void
}
const Filter = memo(({onPressSort}: FilterProps) => {
  const onSort = useCallback(
    (id: string) => {
      if (id === 'sort') {
        onPressSort?.()
      }
    },
    [onPressSort],
  )

  return (
    <>
      <Spacer height={8} />
      <FlashList
        horizontal
        bounces={false}
        estimatedItemSize={114}
        showsHorizontalScrollIndicator={false}
        style={styles.filtersList}
        ItemSeparatorComponent={() => <Spacer width={12} />}
        keyExtractor={it => it.id}
        // @ts-ignore
        renderItem={({item}) => <FilterItem onPress={onSort} {...item} />}
        data={fakeFilters}
      />
      <Spacer height={10} />
    </>
  )
})

const fakeFilters = [
  {
    id: 'sort',
    icon: <SortIcon />,
  },
  {
    id: 'brands',
    name: 'бренды',
    status: 'active',
  },
  {
    id: '988',
    name: 'SALVATORE FERRAGAMO',
    status: 'removable',
  },
  {
    id: 'size',
    name: 'Размер',
  },
]

const Counter = memo(({count}: {count: number}) => (
  <>
    <Spacer height={10} />
    <Text center color={Color.primaryGray} gp4>
      {getProductsCountString(count)}
    </Text>
    <Spacer height={18} />
  </>
))

const styles = StyleSheet.create({
  filtersList: {
    paddingVertical: 6,
  },
})
