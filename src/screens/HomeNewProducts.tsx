import React from 'react'

import {nanoid} from '@reduxjs/toolkit'

import {HomeNewProducts} from 'src/components/HomeNewProducts'
import {useTypedNavigation} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {
  addItemToFavorites,
  removeItemFromFavorites,
} from 'src/store/favoritesSlice'
import {ProductPreviewInfo} from 'src/types'

export const HomeNewProductsScreen = () => {
  const {navigate} = useTypedNavigation()
  const dispatch = useTypedDispatch()
  // Пока тут нету никаких хуков, вызывающих ре-рендер, можно обходться без useCallback
  const onPressProduct = (item: ProductPreviewInfo) => {
    navigate('productDetail', item)
  }

  const onPressStarIcon = (item: ProductPreviewInfo) => {
    dispatch(addItemToFavorites({...item, id: nanoid()}))
  }

  const onPressRemoveStarIcon = (item: ProductPreviewInfo) => {
    dispatch(removeItemFromFavorites(item.productId))
  }

  return (
    <HomeNewProducts
      onPressProduct={onPressProduct}
      onPressStarIcon={onPressStarIcon}
      onPressRemoveStarIcon={onPressRemoveStarIcon}
    />
  )
}
