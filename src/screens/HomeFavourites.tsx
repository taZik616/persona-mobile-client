import React from 'react'

import {nanoid} from '@reduxjs/toolkit'

import {HomeFavourites} from 'src/components/HomeFavourites'
import {useTypedNavigation} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {addItemToBasket} from 'src/store/basketSlice'
import {removeItemFromFavorites} from 'src/store/favoritesSlice'
import {ProductPreviewInfo} from 'src/types'

export const HomeFavouritesScreen = () => {
  const {navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()

  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', item)
  }

  const onPressRemove = (item: ProductPreviewInfo) => {
    dispatch(removeItemFromFavorites(item.productId))
  }

  const onPressAddToBasket = (item: ProductPreviewInfo) => {
    dispatch(addItemToBasket({...item, id: nanoid()}))
  }

  return (
    <HomeFavourites
      onPressAddToBasket={onPressAddToBasket}
      onPressRemove={onPressRemove}
      onPressProduct={onPressProduct}
    />
  )
}
