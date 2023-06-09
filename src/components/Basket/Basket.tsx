import React, {memo, useCallback, useState} from 'react'

import {APP_API_URL} from '@env'
import {FlashList} from '@shopify/flash-list'
import axios, {AxiosError} from 'axios'
import {Alert} from 'react-native'

import {
  captureException,
  cleanNumber,
  getProductsCountString,
} from 'src/helpers'
import {useTypedNavigation} from 'src/hooks'
import {vibration} from 'src/services/vibration'
import {
  selectBasket,
  selectBasketPromocode,
  selectBasketSelectedIds,
  selectIsAuthenticated,
  store,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {deselectBasketItem, selectBasketItem} from 'src/store/basketSlice'
import {Color} from 'src/themes'
import {ProductInBasketI, ProductPreviewInfo} from 'src/types'

import {BasketCardWHM} from 'ui/cards/BasketCard'
import {
  Button,
  FirstBuyInAppBanner,
  Header,
  Hint,
  SafeLandscapeView,
  Spacer,
  Text,
  ViewToggler,
} from 'ui/index'

import {BasketListEmpty} from './BasketListEmpty'

interface BasketProps {
  onPressPromoEntry?: () => void
  onPressBasketItem?: (item: ProductPreviewInfo) => void
  onPressRemovePromo?: () => void
}

export const Basket = memo(
  ({onPressBasketItem, onPressRemovePromo, onPressPromoEntry}: BasketProps) => {
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
            <SafeLandscapeView safeArea>
              <Spacer height={20} />
              <ViewToggler
                initialValue={filter}
                onEndToggle={setFilter}
                options={options}
              />
              <Spacer height={8} />
              <Hint
                id="basket-1f"
                spaceBottom={8}
                content="Перед тем, как купить товары из корзины, вы должны выбрать их. Для этого следует нажать на круглую кнопку слева от товара."
              />
              <Hint
                id="basket-2f"
                spaceBottom={8}
                content="Если вам нужно удалить товар из корзины, проведите пальцем справа налево и нажмите появившуюся кнопку удаления."
              />
              <Hint
                id="basket-3f"
                content="Если вы хотите добавить товар в избранное, проведите пальцем слева направо и нажмите появившуюся кнопку добавления в избранное."
              />
              <Spacer height={8} />
            </SafeLandscapeView>
          }
          ListFooterComponent={
            curData.length ? (
              <SafeLandscapeView safeArea>
                <Spacer height={16} />
                <Button gp5 onPress={onPressPromoEntry} variant="outline">
                  {promocode ? 'Сменить промокод' : 'Добавить  промокод'}
                </Button>
                <FirstBuyInAppBanner spaceTop={16} />
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
                <BuyBtn onRemovePromo={onPressRemovePromo} />
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

interface BuyBtnProps {
  onRemovePromo?: () => void
}

const BuyBtn = memo(({onRemovePromo}: BuyBtnProps) => {
  const disabled = useTypedSelector(selectBasketSelectedIds).length < 1
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)
  const {navigate} = useTypedNavigation()
  const [purchaseError, setPurchaseError] = useState('')

  const onPressBuy = async () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Действие не доступно',
        'Для того чтобы совершить покупку нужно войти в аккаунт',
        [
          {
            onPress: () =>
              navigate('home', {
                screen: 'homeProfile',
                params: {
                  whenLoginGoToBasket: true,
                },
              }),
            style: 'default',
            text: 'Войти',
          },
          {
            text: 'Отмена',
            style: 'destructive',
          },
        ],
        {cancelable: true},
      )
      return
    }
    const {selectedItemIds, promocode} = store.getState().basket
    const productVariantIds = selectedItemIds
      .map(a => a.split('-')[1])
      .join(',')
    const token = store.getState().profile.authToken ?? ''
    try {
      const res = await axios.get(
        `${APP_API_URL}/api/v1/order-personal-discount-calc`,
        {
          params: {
            productVariantIds,
            promocode,
          },
          headers: {Authorization: token ? `Token ${token}` : ''},
        },
      )
      if (res.data) {
        const {priceWithoutPersonalDiscount, priceWithPersonalDiscount} =
          res.data
        vibration.success()
        setPurchaseError('')
        navigate('buy', {
          priceWithoutPersonalDiscount,
          priceWithPersonalDiscount,
        })
        onRemovePromo?.()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        const errorMessage = (axiosError.response?.data as any)?.error
        setPurchaseError(errorMessage)
      } else {
        captureException(error)
      }
    }
  }
  return (
    <>
      <Button disabled={disabled} onPress={onPressBuy} gp5>
        Купить
      </Button>
      {purchaseError ? (
        <>
          <Spacer height={8} />
          <Text color={Color.textRed1} gp1>
            {purchaseError}
          </Text>
        </>
      ) : (
        <></>
      )}
    </>
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
