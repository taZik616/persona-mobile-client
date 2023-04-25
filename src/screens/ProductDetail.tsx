import React, {useCallback, useEffect, useRef} from 'react'

import {
  AddedToBasket,
  AddedToBasketRefType,
  ProductDetail,
  SizeSelector,
  SizeSelectorRefType,
} from 'src/components/ProductDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {addItemToBasket} from 'src/store/basketSlice'
import {addItemToRecently} from 'src/store/recentlyWatchedSlice'
// import {useGetProductByIdQuery} from 'src/store/shopApi'

export const ProductDetailScreen = () => {
  const addedToBasketRef = useRef<AddedToBasketRefType>(null)
  const sizeSelectorRef = useRef<SizeSelectorRefType>(null)
  const isFastBuy = useRef<boolean>(false)

  const {productId, item} = useTypedRoute<'productDetail'>().params ?? {}
  const dispatch = useTypedDispatch()
  const {goBack, navigate} = useTypedNavigation()

  const onPressGoBasket = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(() => navigate('basket'), 250)
  }, [navigate])

  const onPressContinue = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(goBack, 250)
  }, [])

  const onPressAddToBasket = useCallback(() => {
    isFastBuy.current = false
    if (item) {
      sizeSelectorRef.current?.open?.()
    }
  }, [])

  const onSelectSize = useCallback((size: val) => {
    console.log('🚀 - size:', size.label, '- id:', size.value)
    sizeSelectorRef.current?.close?.()
    if (!item) {
      return
    }
    if (!isFastBuy.current) {
      dispatch(addItemToBasket({...item, size: size.label}))
      setTimeout(() => addedToBasketRef.current?.open?.(), 250)
    } else {
      setTimeout(
        () => navigate('fastBuy', {product: {...item, size: size.label}}),
        250,
      )
    }
  }, [])

  const onPressFastBuy = useCallback(() => {
    isFastBuy.current = true
    sizeSelectorRef.current?.open?.()
  }, [])

  useEffect(() => {
    item && dispatch(addItemToRecently(item))
  }, [])

  if (!item) return <></>
  return (
    <>
      <ProductDetail
        onPressFastBuy={onPressFastBuy}
        onPressAddToBasket={onPressAddToBasket}
        {...item}
      />
      <AddedToBasket
        onPressContinue={onPressContinue}
        onPressGoBasket={onPressGoBasket}
        ref={addedToBasketRef}
      />
      <SizeSelector
        values={sizeValues}
        onPressContinue={onSelectSize}
        ref={sizeSelectorRef}
      />
    </>
  )
}
type val = {
  value: number
  label: string
}
const start = 10
const sizeValues = new Array(start + 1)
  .fill(0)
  .map((_, i) => {
    const value = start - i
    return {value, label: `${value} size`}
  })
  .reverse()
