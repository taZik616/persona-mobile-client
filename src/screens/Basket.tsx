import React from 'react'

import {Basket} from 'src/components/Basket'
import {useTypedNavigation} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {removeItem} from 'src/store/basketSlice'
import {ProductPreviewInfo} from 'src/types'

export const BasketScreen = () => {
  const {goBack, navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const onPressBasketItem = (id: string, item: ProductPreviewInfo) => {
    console.log('onPressBasketItem:', id)
    navigate('productDetail', item)
  }
  const onPressAddFavorites = (id: string) => {
    console.log('onPressAddFavorites:', id)
  }
  const onPressRemove = (id: string) => {
    console.log('onPressRemove:', id)
    dispatch(removeItem(id))
  }

  return (
    <Basket
      onPressAddFavorites={onPressAddFavorites}
      onPressRemove={onPressRemove}
      onPressBasketItem={onPressBasketItem}
      onPressBack={goBack}
    />
  )
}
