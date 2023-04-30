import React, {memo, useCallback, useState} from 'react'

import {FlashList} from '@shopify/flash-list'

import {cleanNumber, getProductsCountString} from 'src/helpers'
import {
  selectBasket,
  selectBasketSelectedIds,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {deselectBasketItem, selectBasketItem} from 'src/store/basketSlice'
import {ProductPreviewInfo} from 'src/types'

import {BasketListEmpty} from './BasketListEmpty'

import {BasketCardWHM} from '../ui/BasketCard'
import {Button} from '../ui/Button'
import {Header} from '../ui/Header'
import {SafeLandscapeView} from '../ui/SafeLandscapeView'
import {Spacer} from '../ui/Spacer'
import {ViewTogglerWHM} from '../ui/ViewToggler'

interface BasketProps {
  onPressPromoEntry?: () => void
  onPressBuy?: () => void
  onPressBasketItem?: (item: ProductPreviewInfo) => void
}

export const Basket = memo(
  ({onPressBasketItem, onPressBuy, onPressPromoEntry}: BasketProps) => {
    const [filter, setFilter] = useState(options[0].value)
    const dispatch = useTypedDispatch()
    const items = useTypedSelector(selectBasket)

    const isAvailable = options[0].value === filter

    const curData = items?.filter(it => it.isAvailable === isAvailable)
    const onChangeSelect = useCallback(
      (product: ProductPreviewInfo, isSelected: boolean) => {
        dispatch(
          isSelected
            ? selectBasketItem(product.productId)
            : deselectBasketItem(product.productId),
        )
      },
      [],
    )
    return (
      <>
        <WrappedHeader />
        <FlashList
          data={curData}
          estimatedItemSize={230}
          keyExtractor={it => it.productId + filter}
          ListEmptyComponent={<BasketListEmpty isAvailable={isAvailable} />}
          ListHeaderComponent={
            <>
              <Spacer height={20} />
              <ViewTogglerWHM
                initialValue={filter}
                onEndToggle={setFilter}
                options={options}
              />
              <Spacer height={16} />
            </>
          }
          ListFooterComponent={
            curData.length ? (
              <SafeLandscapeView safeArea>
                <Spacer height={16} />
                <Button gp5 onPress={onPressPromoEntry} variant="outline">
                  Добавить промокод
                </Button>
                <Spacer height={16} />
                <BuyBtn onPress={onPressBuy} />
                <Spacer withBottomInsets height={28} />
              </SafeLandscapeView>
            ) : (
              <></>
            )
          }
          ItemSeparatorComponent={() => <Spacer height={12} />}
          renderItem={({item}) => (
            <BasketCardWHM
              onPress={onPressBasketItem}
              onChangeSelect={onChangeSelect}
              {...item}
            />
          )}
        />
      </>
    )
  },
)
const BuyBtn = memo(({onPress}: {onPress?: () => void}) => {
  const disabled = useTypedSelector(selectBasketSelectedIds).length < 1
  return (
    <Button disabled={disabled} onPress={onPress} gp5>
      Купить
    </Button>
  )
})
const WrappedHeader = memo(() => {
  const selected = useTypedSelector(selectBasketSelectedIds)
  const total = useTypedSelector(selectBasket)
    .filter(a => selected.includes(a.productId))
    .reduce((acc, el) => acc + el.price, 0)
  return (
    <Header
      title="Корзина"
      subtitle={
        selected.length
          ? `${getProductsCountString(selected.length)} на ${cleanNumber(
              total,
              ' ',
              0,
            )} ₽`
          : undefined
      }
      showBack
      hideSearch
      hideBasket
    />
  )
})
const options = [
  {
    value: 'available',
    title: 'В наличии',
  },
  {
    value: 'notAvailable',
    title: 'Нет в наличии',
  },
]
