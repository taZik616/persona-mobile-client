import React from 'react'

import {Orders} from 'src/components/Orders'

export const OrdersScreen = () => {
  const onPressProductItem = (productId: string) => {
    console.log('onPressProductItem:', productId)
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
