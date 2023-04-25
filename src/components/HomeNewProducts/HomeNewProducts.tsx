import React from 'react'

import {FlashList} from '@shopify/flash-list'
import {StyleSheet} from 'react-native'

import {useScreenBlockCurrent} from 'src/hooks'
import {useGender} from 'src/hooks/useGender'
import {useHorizontalMargins} from 'src/hooks/useHorizontalMargins'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {useGetProductsQuery} from 'src/store/shopApi'
import {ProductPreviewInfo} from 'src/types'

import {FilterItem} from '../ui/FilterItem'
import {Header} from '../ui/Header'
import {FilterIcon} from '../ui/icons/common'
import {ProductCard} from '../ui/ProductCard'
import {SelectorTwoOptions} from '../ui/SelectorTwoOptions'
import {Spacer} from '../ui/Spacer'

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
        ListHeaderComponent={() => (
          <>
            <Spacer height={8} />
            <Filters />
            <Spacer height={20} />
          </>
        )}
        keyExtractor={item => item.productId}
        data={!products.isLoading ? products.currentData : []}
      />
    </>
  )
}
const Filters = () => {
  const {paddingHorizontal} = useHorizontalMargins({safeArea: true})
  return (
    <FlashList
      horizontal
      bounces={false}
      style={styles.filtersList}
      contentContainerStyle={paddingHorizontal}
      ItemSeparatorComponent={() => <Spacer width={12} />}
      keyExtractor={it => it.id}
      // @ts-ignore
      renderItem={({item}) => <FilterItem {...item} />}
      data={fakeFilters}
    />
  )
}

const styles = StyleSheet.create({
  filtersList: {
    paddingVertical: 6,
  },
})
