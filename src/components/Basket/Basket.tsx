import React, {memo, useCallback, useState} from 'react'

import {FlashList} from '@shopify/flash-list'

import {cleanNumber, getProductsCountString} from 'src/helpers'
import {
  selectBasket,
  selectBasketPromocode,
  selectBasketSelectedIds,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {deselectBasketItem, selectBasketItem} from 'src/store/basketSlice'
import {ProductInBasketI, ProductPreviewInfo} from 'src/types'

import {BasketCardWHM} from 'ui/cards/BasketCard'
import {
  Button,
  Header,
  SafeLandscapeView,
  Spacer,
  ViewTogglerWHM,
} from 'ui/index'

import {BasketListEmpty} from './BasketListEmpty'

interface BasketProps {
  onPressPromoEntry?: () => void
  onPressBuy?: () => void
  onPressBasketItem?: (item: ProductPreviewInfo) => void
  onPressRemovePromo?: () => void
}

export const Basket = memo(
  ({
    onPressBasketItem,
    onPressBuy,
    onPressRemovePromo,
    onPressPromoEntry,
  }: BasketProps) => {
    const [filter, setFilter] = useState(options[0].value)
    const dispatch = useTypedDispatch()
    const items = useTypedSelector(selectBasket)
    const promocode = useTypedSelector(selectBasketPromocode)

    const isAvailable = options[0].value === filter

    const curData = items.filter(it => it.isAvailable === isAvailable)
    const onChangeSelect = useCallback(
      (product: ProductInBasketI, isSelected: boolean) => {
        dispatch(
          isSelected
            ? selectBasketItem({
                productId: product.productId,
                variantId: product.variant.uniqueId,
              })
            : deselectBasketItem({
                productId: product.productId,
                variantId: product.variant.uniqueId,
              }),
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
          keyExtractor={it => it.productId + it.variant.uniqueId + filter}
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
                  {promocode ? 'Сменить промокод' : 'Добавить  промокод'}
                </Button>
                {promocode ? (
                  <>
                    <Spacer height={16} />
                    <Button
                      gp5
                      onPress={onPressRemovePromo}
                      variant="secondaryFilled">
                      Отменить промокод
                    </Button>
                  </>
                ) : (
                  <></>
                )}
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
  const selectionParsed = selected.map(a => ({
    productId: a.split('-')[0],
    variantId: a.split('-')[1],
  }))
  const total = useTypedSelector(selectBasket)
    .filter(
      a =>
        selectionParsed.findIndex(
          b =>
            b.productId === a.productId && b.variantId === a.variant.uniqueId,
        ) !== -1,
    )
    .reduce((acc, el) => {
      const {price} = el.variant

      return (
        acc +
        (price -
          price * (el.variant.discountPercent / 100) -
          (el.personalDiscountInRub || 0))
      )
    }, 0)

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
