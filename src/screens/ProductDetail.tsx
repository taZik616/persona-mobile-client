import React, {useCallback, useEffect, useRef} from 'react'

import {
  AddedToBasket,
  AddedToBasketRefType,
  ProductDetail,
  SizeSelector,
  SizeSelectorRefType,
} from 'src/components/ProductDetail'
import {showAlertBasketLocked} from 'src/helpers/showAlertBasketLocked'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {
  selectIsAuthenticated,
  useTypedDispatch,
  useTypedSelector,
} from 'src/store'
import {addItemToBasket} from 'src/store/basketSlice'
import {addItemToRecently} from 'src/store/recentlyWatchedSlice'

export const ProductDetailScreen = () => {
  const addedToBasketRef = useRef<AddedToBasketRefType>(null)
  const sizeSelectorRef = useRef<SizeSelectorRefType>(null)
  const isFastBuy = useRef<boolean>(false)

  const {item} = useTypedRoute<'productDetail'>().params ?? {}
  const {goBack, navigate} = useTypedNavigation()

  const dispatch = useTypedDispatch()
  const isAuthenticated = useTypedSelector(selectIsAuthenticated)

  const onPressGoBasket = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(() => navigate('basket'), 250)
  }, [navigate])

  const onPressContinue = useCallback(() => {
    addedToBasketRef.current?.close?.()
    setTimeout(goBack, 250)
  }, [])

  const onPressAddToBasket = useCallback(() => {
    if (isAuthenticated) {
      isFastBuy.current = false
      if (item) {
        sizeSelectorRef.current?.open?.()
      }
    } else {
      showAlertBasketLocked()
    }
  }, [])

  const onSelectSize = useCallback((size: val) => {
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
