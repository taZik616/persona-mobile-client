import React from 'react'

import {nanoid} from '@reduxjs/toolkit'

import {Basket} from 'src/components/Basket'
import {useTypedNavigation} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {removeItemFromBasket} from 'src/store/basketSlice'
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from 'src/store/favoritesSlice'
import {ProductPreviewInfo} from 'src/types'

export const BasketScreen = () => {
  const {goBack, navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const onPressBasketItem = (id: string, item: ProductPreviewInfo) => {
    console.log('onPressBasketItem:', id)
    navigate('productDetail', item)
  }

  const onPressRemove = (id: string) => {
    console.log('onPressRemove:', id)
    dispatch(removeItemFromBasket(id))
  }

  const onPressStar = (item: ProductPreviewInfo) => {
    dispatch(addItemToFavorites({...item, id: nanoid()}))
  }

  const onPressRemoveStar = (item: ProductPreviewInfo) => {
    dispatch(removeItemFromFavorites(item.productId))
  }

  return (
    <Basket
      onPressStar={onPressStar}
      onPressRemoveStar={onPressRemoveStar}
      onPressRemove={onPressRemove}
      onPressBasketItem={onPressBasketItem}
      onPressBack={goBack}
    />
  )
}
