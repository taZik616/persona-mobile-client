import React from 'react'

import {FlashList} from '@shopify/flash-list'

import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {useGetProductsQuery} from 'src/store/shopApi'

import {Header} from '../ui/Header'
import {ProductCard} from '../ui/ProductCard'
import {Spacer} from '../ui/Spacer'
import {ViewToggler} from '../ui/ViewToggler'

interface HomeFavouritesProps {
  onPressRemove?: (item: any) => void
  onPressAddToBasket?: (item: any) => void
  onPressProduct?: (item: any) => void
}

export const HomeFavourites = ({
  onPressProduct,
  onPressAddToBasket,
  onPressRemove,
}: HomeFavouritesProps) => {
  const products = useGetProductsQuery({
    end: 1600,
    start: 1500,
    sortBy: 'stock',
    sortedValues: '1',
  })
  const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()

  return (
    <>
      <Header title="Избранное" hideSearch subtitle="0 товаров" />
      <Spacer height={16} />
      <ViewToggler options={togglerOptions} />
      <Spacer height={8} />
      <FlashList
        key={numColumns}
        numColumns={numColumns}
        refreshing={products.isFetching && !!products.currentData}
        onRefresh={products.refetch}
        estimatedItemSize={379} // if !showAddToBasket - 351
        contentContainerStyle={contentPaddingsStyle}
        renderItem={({item}) => (
          <ProductCard
            width={cardWidth}
            topRightIcon="cross"
            showAddToBasket
            onPressTopRightIcon={onPressRemove}
            onPressAddToBasket={onPressAddToBasket}
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

const togglerOptions = [
  {value: 'available', title: 'Доступно для заказа'},
  {value: 'notAvailable', title: 'Нет в наличии'},
]

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 12,
//   },
//   marginHorizontal: {
//     marginHorizontal: 20,
//   },
// })
