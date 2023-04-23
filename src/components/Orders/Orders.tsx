import React from 'react'

import {FlashList} from '@shopify/flash-list'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {OrderInfoInterface} from 'src/types'

import {Header} from '../ui/Header'
import {OrderCard} from '../ui/OrderCard'
import {Spacer} from '../ui/Spacer'

interface OrdersProps {
  onPressProductItem?: (productId: string) => void
  onPressOrder?: (orderId: string) => void
  orders?: OrderInfoInterface[]
}

const OrderCardWHM = withHorizontalMargins(OrderCard)

export const Orders = ({
  onPressProductItem,
  orders,
  onPressOrder,
}: OrdersProps) => {
  return (
    <>
      <Header title="Ваши заказы" showBack hideSearch hideBasket />
      <FlashList
        data={orders}
        estimatedItemSize={250}
        keyExtractor={it => it.id}
        ListHeaderComponent={() => <Spacer height={20} />}
        ListFooterComponent={() => <Spacer withBottomInsets height={20} />}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({item}) => (
          <OrderCardWHM
            onPress={onPressOrder}
            onPressProductItem={onPressProductItem}
            {...item}
          />
        )}
      />
    </>
  )
}
