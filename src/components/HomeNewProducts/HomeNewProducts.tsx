import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleSheet} from 'react-native'

import {getProductsCountString} from 'src/helpers'
import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {useGetProductsQuery} from 'src/store/shopApi'
import {Color} from 'src/themes'
import {ProductPreviewInfo, ProductsDataI} from 'src/types'

import {FilterItem} from '../ui/FilterItem'
import {Header} from '../ui/Header'
import {FilterIcon} from '../ui/icons/common'
import {ProductCard} from '../ui/ProductCard'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {LoadingProductListSkeleton} from '../ui/Skeletons/LoadingProductList'
import {Spacer} from '../ui/Spacer'
import {Text} from '../ui/Text'

const fakeFilters = [
  {
    id: 'filter',
    icon: <FilterIcon />,
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

interface HomeNewProductsProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
  onPressSort?: () => void
}

export const HomeNewProducts = memo(
  forwardRef<any, HomeNewProductsProps>(
    ({onPressProduct, onPressSort}, ref) => {
      const {isMenSelected, onChangeGender, values} = useGender()
      const [sort, setSort] = useState('')

      useImperativeHandle(ref, () => ({
        setSort,
      }))

      useScreenBlockCurrent()

      const products = useGetProductsQuery({
        end: 10700,
        start: 10600,
        sortBy: 'stock',
        sortedValues: '1',
      })

      const curData = products.currentData as ProductsDataI

      const {numColumns, cardWidth, contentPaddingsStyle} =
        useProductListHelper()

      const isLoad = products.isLoading || !products.currentData

      return (
        <>
          <Header title="Новые поступления" />
          <SelectorTwoOptions
            isSecondActive={isMenSelected}
            onChange={onChangeGender}
            values={values}
          />
          <Spacer height={8} />
          {isLoad ? (
            <LoadingProductListSkeleton
              width={cardWidth}
              style={contentPaddingsStyle}
              numColumns={numColumns}
            />
          ) : (
            <FlashList
              key={numColumns}
              numColumns={numColumns}
              refreshing={products.isFetching && !!curData?.data}
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
              ListHeaderComponent={
                <>
                  <Spacer height={8} />
                  <Filters onPressSort={onPressSort} />
                  <Spacer height={20} />
                  {curData?.count && (
                    <>
                      <Text center color={Color.primaryGray} gp4>
                        {getProductsCountString(curData.count)}
                      </Text>
                      <Spacer height={18} />
                    </>
                  )}
                </>
              }
              keyExtractor={item => item.productId}
              data={curData?.data ?? []}
            />
          )}
        </>
      )
    },
  ),
)

interface FiltersProps {
  onPressSort?: () => void
}
const Filters = memo(({onPressSort}: FiltersProps) => {
  const onSort = useCallback(
    (id: string) => {
      if (id === 'filter') {
        onPressSort?.()
      }
    },
    [onPressSort],
  )

  return (
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
  )
})

const styles = StyleSheet.create({
  filtersList: {
    paddingVertical: 6,
  },
})
