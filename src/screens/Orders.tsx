import React from 'react'

import {Orders} from 'src/components/Orders'
import {useTypedNavigation} from 'src/hooks'

export const OrdersScreen = () => {
  const {navigate} = useTypedNavigation()
  const onPressProductItem = (productId: string) => {
    navigate('productDetail', {productId})
  }
  const onPressOrder = (orderId: number) => {
    console.log('onPressOrder:', orderId)
  }

  return (
    <Orders
      onPressOrder={onPressOrder}
      onPressProductItem={onPressProductItem}
    />
  )
}
