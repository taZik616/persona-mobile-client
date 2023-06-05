import React, {memo, useState} from 'react'

import {FlashList} from '@shopify/flash-list'

import {getProductsCountString} from 'src/helpers'
import {useScreenBlockCurrent} from 'src/hooks'
import {useProductListHelper} from 'src/hooks/useProductListHelper'
import {selectFavorites, useTypedSelector} from 'src/store'
import {ProductPreviewInfo} from 'src/types'

import {ProductCard} from 'ui/cards'
import {Header, Spacer, ViewToggler} from 'ui/index'

import {FavoritesListEmpty} from './FavoritesListEmpty'

interface HomeFavouritesProps {
  onPressProduct?: (item: ProductPreviewInfo) => void
}

export const HomeFavourites = memo(({onPressProduct}: HomeFavouritesProps) => {
  useScreenBlockCurrent()
  const [filter, setFilter] = useState(togglerOptions[0].value)

  const items = useTypedSelector(selectFavorites)
  const {numColumns, cardWidth, contentPaddingsStyle} = useProductListHelper()

  const isAvailable = togglerOptions[0].value === filter

  const curData = items?.filter(it => it.isAvailable === isAvailable)
  return (
    <>
      <Header
        title="Избранное"
        hideSearch
        subtitle={getProductsCountString(items.length)}
      />
      <FlashList
        key={numColumns}
        numColumns={numColumns}
        estimatedItemSize={351}
        contentContainerStyle={contentPaddingsStyle}
        ListEmptyComponent={<FavoritesListEmpty isAvailable={isAvailable} />}
        ListHeaderComponent={
          <>
            <Spacer height={20} />
            <ViewToggler
              initialValue={filter}
              onEndToggle={setFilter}
              options={togglerOptions}
            />
            <Spacer height={16} />
          </>
        }
        renderItem={({item}) => (
          <ProductCard
            width={cardWidth}
            topRightIcon="cross"
            onPress={onPressProduct}
            {...item}
          />
        )}
        keyExtractor={it => it.productId + filter}
        data={curData}
      />
    </>
  )
})

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
