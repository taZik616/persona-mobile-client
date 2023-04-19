import React from 'react'

import {FlashList} from '@shopify/flash-list'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {withHorizontalMargins} from 'src/hoc/withHorizontalMargins'
import {OrderInfoInterface} from 'src/types'

import {Header} from '../ui/Header'
import {OrderCard} from '../ui/OrderCard'
import {Spacer} from '../ui/Spacer'

interface OrdersProps {
  onPressBack?: () => void
  onPressProductItem?: (productId: string) => void
  onPressOrder?: (orderId: string) => void
  orders?: OrderInfoInterface[]
}

const OrderCardWHM = withHorizontalMargins(OrderCard)

export const Orders = ({
  onPressProductItem,
  orders,
  onPressOrder,
  onPressBack,
}: OrdersProps) => {
  const {bottom} = useSafeAreaInsets()
  return (
    <>
      <Header
        title="Ваши заказы"
        onPressBack={onPressBack}
        showBack
        hideSearch
        hideBasket
      />
      <FlashList
        data={orders}
        estimatedItemSize={250}
        keyExtractor={it => it.id}
        ListHeaderComponent={() => <Spacer height={20} />}
        ListFooterComponent={() => <Spacer height={bottom + 20} />}
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
