import React from 'react'

import {ProductDetail} from 'src/components/ProductDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {useGetProductByIdQuery} from 'src/store/shopApi'

export const ProductDetailScreen = () => {
  const {productId, ...item} = useTypedRoute<'productDetail'>().params ?? {}

  const {goBack} = useTypedNavigation()
  const productDetail = useGetProductByIdQuery(productId)

  const mixedItem = Object.assign(item, productDetail.currentData[0])

  return <ProductDetail onPressBack={goBack} {...mixedItem} />
}
