import React, {useEffect} from 'react'

import {ProductDetail} from 'src/components/ProductDetail'
import {useTypedNavigation, useTypedRoute} from 'src/hooks'
import {useTypedDispatch} from 'src/store'
import {addItemToRecently} from 'src/store/recentlyWatchedSlice'
import {useGetProductByIdQuery} from 'src/store/shopApi'

export const ProductDetailScreen = () => {
  const {productId, ...item} = useTypedRoute<'productDetail'>().params ?? {}
  const dispatch = useTypedDispatch()
  const {goBack} = useTypedNavigation()

  const productDetail = useGetProductByIdQuery(productId)

  const mixedItem = Object.assign(item, productDetail.currentData?.[0] ?? {})

  useEffect(() => {
    item.title && dispatch(addItemToRecently({...item, productId} as any))
  }, [])

  return <ProductDetail onPressBack={goBack} {...mixedItem} />
}
